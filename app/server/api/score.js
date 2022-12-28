const fetch = require("node-fetch")
const api_keys = require("../secrets/api_keys");

const router = require("express").Router()

router.post('/score', async (req, res) => {
  // score = await getWalkScore("address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
  // wattBuy = await getWattBuy("address=1515&city=Portland&state=Or&zip=97202")
  // console.log(score)
  
  //Formats the address to be used in the position stack api
  const positionstackAddress = data.address + " " + data.street + " " + data.kindOfStreet + " " + data.cardinal + " " + data.cityName + " " + data.state;

  //Longitude and Latitude from positionstack that are needed for walkscore api
  const lon = (await getPositionStack(positionstackAddress)).data.results.longitude;
  const lat = (await getPositionStack(positionstackAddress)).data.results.latitude;

  const walkScoreAddress = `address=${data.address}%${data.street}%20${data.kindOfStreet}%20${data.cityName}%20${data.state}%${data.zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
  const walkScore = await getWalkScore(walkScoreAddress);

  //Formats the address to be used in the wattbuy api
  const wattBuyAddress = `address=${data.address}&city=${data.cityName}&state=${data.state}&zip=${data.zip}`;
  //Gets the energy score and the average carbon footprint from the wattbuy api
  const avgCarbonFootprint = await getAvgCarbonFootprint(wattBuyAddress);
  const adjustedCarbonFootprint = avgCarbonFootprint * 0.0395;
  const energyScore = await getEnergyScore(wattBuyAddress);
  //Calculates the climate score
  const cliScore = (walkScore + adjustedCarbonFootprint + energyScore) / 3;

  console.log('Climate Score: ' + cliScore);

  res.status(200).json({
    score: cliScore,
    breakdown: {
      walkscore: req.body.walkscore,
      wattbuy: req.body.wattbuy
    }
  });
});

module.exports = router

