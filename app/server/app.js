const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api/score.js');

const app = express();

app.use(express.static('../client/dist'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api', api);

app.get('/api/climat')

const port = process.env.PORT || 5678;

app.listen(port, () => {
	console.log(`Server is up at port http://localhost:${port}`);
});

module.exports = app;
