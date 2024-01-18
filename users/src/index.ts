import express from 'express';
import os from 'os';
import morgan from 'morgan';
import { register, collectDefaultMetrics, Counter } from 'prom-client';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan('tiny'));

collectDefaultMetrics();

const requestCounter = new Counter({
	name: 'users_request_count',
	help: 'Total number of requests to the users service',
	labelNames: ['endpoint'],
});

app.get('/users', (req, res) => {
	const containerID = os.hostname();
	res.header('X-Container-ID', containerID);
	res.send(
		`Hello, Users! This request was handled by Container ${containerID}`
	);

	requestCounter.inc({ endpoint: '/users' });
});

app.get('/metrics', async (req, res) => {
	try {
		const metrics = await register.metrics();
		res.set('Content-Type', register.contentType);
		res.end(metrics);
	} catch (err) {
		console.error('Error while collecting metrics', err);
		res.status(500).end();
	}
});

app.listen(port, () => {
	console.log(`Users service is running on http://localhost:${port}`);
});
