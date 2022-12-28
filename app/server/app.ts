const express = require('express');
const cors = require('cors');
const path = require('path');
import { getClimateScore } from "../client/src/backend/climateScore";
import type { AddressData } from "../client/src/common/types";
const app = express();

const api = require('./api');
const { notFound, errorHandler } = require('./middlewares/errors.middleware');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/public'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
	});
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/api/climate/:address/:street/:kindOfStreet/:cardinal/:cityName/:state/:zip', (req: any, res: any) => {
	const data: AddressData = {
		address: req.params.address,
		street: req.params.street,
		kindOfStreet: req.params.kindOfStreet,
		cardinal: req.params.cardinal,
		cityName: req.params.cityName,
		state: req.params.state,
		zip: req.params.zip
	}
	res.send(getClimateScore(data));
});

app.use('/api/v1', api);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
