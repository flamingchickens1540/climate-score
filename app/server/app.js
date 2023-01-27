const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api/score.js');

const app = express();

//host the client
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//host the API
app.use('/api/v1', api);

const port = 3010;

app.listen(port, () => {
	console.log(`Server is up at port http://localhost:${port}`);
});

module.exports = app;
