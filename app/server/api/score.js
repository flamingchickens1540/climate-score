const router = require("express").Router()
const fetch = require("node-fetch");
const APIkeys = require("../secrets/api_keys")

router.post('/score', async (req, res) => {
  const lat = req.body?.lat
  const long = req.body?.long

  if (lat && long) {
    try {
      const locDetails = await getLocationDetails(lat, long)

      const data = await Promise.all([
        getCarbonFootprint(locDetails.state_code),
        getWalkscore(lat, long)
      ]).then((values) => Object.assign({}, ...values))

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
      'X-API-KEY': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh',
      'Accept': 'application/json',
    },
  }).then(res => res.json()).then(data => data.data)

  return {
    "carbonFootprint": data.annual_carbon_footprint,
    "percentNaturalGas": data.estimated_generation_data[0].value,
    "percentHydroelectric": data.estimated_generation_data[1].value,
    "percentWind": data.estimated_generation_data[2].value,
    "percentSolar": data.estimated_generation_data[3].value,
  }
}

async function getWalkscore(lat, long) {
  data = await fetch(`https://api.walkscore.com/score?format=json&lat=${lat}&lon=${long}&wsapikey=${APIkeys.WALKSCORE_API_KEY}`).then(res => res.json())

  if (data.status != 1) throw Error("Walkscore Problem")

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