const api_keys = require("../secrets/api_keys")
const WATTBUY_API_KEY = api_keys.WATTBUY_API_KEY
const COALWEIGHT = -2;
const GASWEIGHT = -1;
const NUCLEARWEIGHT = .5;
const HYDROWEIGHT = 1;
const WINDWEIGHT = 1.1;
const SOLARWEIGHT = 1.1;

//query wattBuy api avg_carbon_footprint
async function getWattBuy(address) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-api-key': WATTBUY_API_KEY
    },
    mode: 'no-cors',
  };

  fetch('address=1515&city=Portland&state=Or&zip=97202', options)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => console.error(err));



  const url = `https://apis.wattbuy.com/v3/electricity/carbon-footprint?${address}`;
  const response = await fetch(url, options)
  const isJSONContentType = response.headers.get('content-type')?.includes('json');
  let data;
  if (isJSONContentType) {
    try {
      data = await response.json();
    } catch (err) {
      console.warn(err);
      data = await response.text();
      console.log({ data, headers: Object.fromEntries(response.headers.entries()), url: response.url })
    }
  } else {
    console.warn('Response is not json');
    data = await response.text();
  }
  console.log(data);
  return data;
}

async function getAvgCarbonFootprint(address) {

  const wattBuy = await getWattBuy(address);
  const avg_carbon_foot_print = wattBuy.data.avg_carbon_foot_print;
  console.log('avg_carbon_foot_print: ' + avg_carbon_foot_print);
  return avg_carbon_foot_print;
}

async function getEnergyScore(address) {
  let energyScore = 0;
  const wattBuy = await getWattBuy(address);
  //Coal
  energyScore += COALWEIGHT * (wattBuy.data.estimated_generation_data[0].value);
  //Nuclear
  energyScore += NUCLEARWEIGHT * (wattBuy.data.estimated_generation_data[1].value);
  //Natural Gas
  energyScore += GASWEIGHT * (wattBuy.data.estimated_generation_data[2].value);
  //Hydro
  energyScore += HYDROWEIGHT * (wattBuy.data.estimated_generation_data[3].value);
  //Wind
  energyScore += WINDWEIGHT * (wattBuy.data.estimated_generation_data[4].value);
  //Solar
  energyScore += SOLARWEIGHT * (wattBuy.data.estimated_generation_data[5].value);
  console.log('energyScore: ' + energyScore);
  return 2 * (energyScore / 6);
}