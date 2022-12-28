const fetch = require("node-fetch")
const api_keys = require("../secrets/api_keys");

const router = require("express").Router()

router.post('/score', async (req, res) => {
  // score = await getWalkScore("address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
  // wattBuy = await getWattBuy("address=1515&city=Portland&state=Or&zip=97202")
  // console.log(score)
  
  res.status(200).json({
    score: Math.round(Math.random() * 100),
    breakdown: {
      walkscore: req.body.walkscore,
      wattbuy: req.body.wattbuy
    }
  });
});

module.exports = router

