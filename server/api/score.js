const router = require("express").Router()
const fetch = require("node-fetch");
const APIkeys = require("../../secrets/api_keys")
const DEBUG = false;
router.post('/score', async (req, res) => {
  const lat = req.body?.lat
  const long = req.body?.long

  if (lat && long) {
    try {
      const locDetails = await getLocationDetails(lat, long)

      const data = await Promise.all([
        getCarbonFootprint(locDetails.state_code),
        getWalkscore(lat, long),
        
      ]).then((values) => Object.assign({}, ...values))
      console.log(data)

      res.status(200).json({
        "error": false,
        ...data
      })
    } catch (err) {
      res.status(500).json({
        "error": true,
        "message": "Something when wrong gathering your Climate Score"
      })
    }
  } else {
    res.status(400).json({
      "error": true,
      "message": "Please provide a lat and long field in the body"
    })
  }
});

module.exports = router

async function getCarbonFootprint(state) {
  data = await fetch(`https://apis.wattbuy.com/v3/electricity/carbon-footprint?state=${state}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': APIkeys.WATTBUY_API_KEY,
      'Accept': 'application/json',
    },
  }).then(res => res.json()).then(data => data.data)
  if (DEBUG) console.log(data);
  //The energy data is different depending on the state the request is being made from
  //If the no energy is generated from that source, wattBuy simply won't return that piece of data.
  //Because the data is returned in an array, simply converting an array to JSON will break for any state with differeny energy sources than Oregon
  let ret = {};
  for(let i = 0; i<data["estimated_generation_data"].length; i++) {  

    let key = data["estimated_generation_data"][i].type;
    let value = data["estimated_generation_data"][i].value;
    ret[key] = value;

  }

  ret.carbonFootprint = data.baseline_annual_usage;
  if(DEBUG) console.log(ret);

  return ret
}

async function getWalkscore(lat, long) {
  data = await fetch(`https://api.walkscore.com/score?format=json&lat=${lat}&lon=${long}&wsapikey=${APIkeys.WALKSCORE_API_KEY}`).then(res => res.json())

  if (data.status != 1) {console.log("WalkScore Problem"); throw Error("Walkscore Problem");}
  if (DEBUG) console.log(data);
  return {
    "walkscore": data.walkscore,
    "walkscoreDescription": data.description
  }
}

async function getLocationDetails(lat, long) {
  return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${APIkeys.GEOAPI_API_KEY}`)
    .then(res => res.json())
    .then(data => data.results[0])
}
