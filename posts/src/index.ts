import express from 'express';
import os from 'os';
import morgan from 'morgan';
import { register, collectDefaultMetrics, Counter } from 'prom-client';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(morgan('tiny'));

collectDefaultMetrics();

const requestCounter = new Counter({
	name: 'posts_request_count',
	help: 'Total number of requests to the posts service',
	labelNames: ['endpoint'],
});

app.get('/posts', (req, res) => {
	const containerID = os.hostname();
	res.header('X-Container-ID', containerID);
	res.send(
		`Hello, Posts! This request was handled by Container ${containerID}`
	);

	requestCounter.inc({ endpoint: '/posts' });
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
	console.log(`Posts service is running on http://localhost:${port}`);
});
