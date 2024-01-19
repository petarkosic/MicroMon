import express from 'express';
import os from 'os';
import morgan from 'morgan';
import {
	collectDefaultMetrics,
	Counter,
	Registry,
	Histogram,
} from 'prom-client';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan('tiny'));

const registry = new Registry();
collectDefaultMetrics({ register: registry });

// Create a counter for successful requests
const successfulRequestsCounter = new Counter({
	name: 'api_requests_successful',
	help: 'Total number of successful API requests',
	registers: [registry],
});

// Create a counter for failed requests
const failedRequestsCounter = new Counter({
	name: 'api_requests_failed',
	help: 'Total number of failed API requests',
	registers: [registry],
});

// Create a histogram for request durations
const requestDurationHistogram = new Histogram({
	name: 'api_request_duration_seconds',
	help: 'Histogram of API request durations',
	registers: [registry],
	buckets: [0.1, 0.5, 1, 2, 5],
});

app.get('/users', (req, res) => {
	const endTimer = requestDurationHistogram.startTimer();

	try {
		const containerID = os.hostname();
		res.header('X-Container-ID', containerID);
		res.send(
			`Hello, Users! This request was handled by Container ${containerID}`
		);

		successfulRequestsCounter.inc();
	} catch (err) {
		failedRequestsCounter.inc();
		const error = err as Error;
		console.error('Error while processing request', error.message);
	} finally {
		endTimer();
	}
});

app.get('/metrics', async (req, res) => {
	try {
		const metrics = await registry.metrics();
		res.set('Content-Type', registry.contentType);
		res.end(metrics);
	} catch (err) {
		console.error('Error while collecting metrics', err);
		res.status(500).end();
	}
});

app.listen(port, () => {
	console.log(`Users service is running on http://localhost:${port}`);
});
