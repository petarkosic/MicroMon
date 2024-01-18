import express from 'express';
import os from 'os';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan('tiny'));

app.get('/users', (req, res) => {
	const containerID = os.hostname();
	res.header('X-Container-ID', containerID);
	res.send(
		`Hello, Users! This request was handled by Container ${containerID}`
	);
});

app.listen(port, () => {
	console.log(`Users service is running on http://localhost:${port}`);
});
