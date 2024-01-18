import express from 'express';
import os from 'os';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/posts', (req, res) => {
	const containerID = os.hostname();
	res.header('X-Container-ID', containerID);
	res.send(
		`Hello, Posts! This request was handled by Container ${containerID}`
	);
});

app.listen(port, () => {
	console.log(`Posts service is running on http://localhost:${port}`);
});
