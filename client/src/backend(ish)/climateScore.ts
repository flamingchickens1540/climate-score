import type { Coords, Res, WattBuyResponse } from '../../common/types';
import { WALKSCORE_API_KEY, WATTBUY_API_KEY, GEOAPI_API_KEY } from './api_keys';

const DEBUG = true;
export async function cliScore(coords: Coords): Promise<Res>{
    let lat = coords.lat;
    let long = coords.long;
    let res: Res = {status: 500};
    if (lat && long) {
        try {
          
          const locDetails = await getLocationDetails(lat, long)
          const walkScoreData = await getWalkscore(lat, long);
          const wattBuyData = await getCarbonFootprint(locDetails.state_code);
          // const data = await Promise.all([
          //     getCarbonFootprint(locDetails.state_code),
          //     getWalkscore(lat, long),
              
          // ]).then((values) => Object.assign({}, ...values))
        if (DEBUG) console.log(walkScoreData, wattBuyData);
          let res: Res = {estimatedGenerationData: wattBuyData.estimatedGenerationData}
          res.estimatedGenerationData = wattBuyData.estimatedGenerationData;
          res.status = 200;
          res.carbonFootprint = wattBuyData.carbonFootprint;
          res.walkScore = walkScoreData.walkscore;
          res.walkScoreDescription = walkScoreData.walkscoreDescription;
          res.error = false;        
          // res.status(200).json({
          //     "error": false,
          //     ...data
          // })
        } catch (err) {
            let res: Res = {status: 500};
            res.status = 500;
            res.error = true;
            res.message = "There was a problem generating your Climate Score";
            // res.status(500).json({
            //     "error": true,
            //     "message": "Something when wrong gathering your Climate Score"
            // })
        }
    } else {
      let res: Res = {status: 500}
        res.status = 400;
        res.error = true;
        res.message = "Please provide a lat and long field in the body";

        // res.status(400).json({
        // "error": true,
        // "message": "Please provide a lat and long field in the body"
        // })
    }
  return res;
}

//exports.app = functions.https.onRequest(app);
async function getCarbonFootprint(state: any): Promise<WattBuyResponse> {
  let data: any = await fetch(`https://apis.wattbuy.com/v3/electricity/carbon-footprint?state=${state}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': WATTBUY_API_KEY,
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": '*',
    },
  }).then(res => res.json()).then(data => data["data"])
  if (DEBUG) console.log(data);
  let ret: WattBuyResponse = {};
  //The energy data is different depending on the state the request is being made from
  //If the no energy is generated from that source, wattBuy simply won't return that piece of data.
  //Because the data is returned in an array, simply converting an array to JSON will break for any state with differeny energy sources than Oregon
  for(let i = 0; i<data["estimated_generation_data"].length; i++) {  

    let key = data["estimated_generation_data"][i].type;
    let value = data["estimated_generation_data"][i].value;
    ret.estimatedGenerationData[key] = value;

  }

  ret.carbonFootprint = data.baseline_annual_usage;
  if(DEBUG) console.log(ret);

  return ret
}

async function getWalkscore(lat: number, long: number) {
  //fetch(`https://ipapi.co/${ip}/json/`).then((res) => res.json());
  let data: any = await fetch(`https://api.walkscore.com/score?format=json&lat=${lat}&lon=${long}&wsapikey=${WALKSCORE_API_KEY}`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": '*',
               // 'Content-Type': 'application/x-www-form-urlencoded',
          }
       }).then((res: { json: () => any; }) => res.json())

  if (data.status != 1) { console.log("WalkScore Problem"); throw Error("Walkscore Problem"); }
  if (DEBUG) console.log(data);
  return {
      "walkscore": data.walkscore,
      "walkscoreDescription": data.description
  }
}

async function getLocationDetails(lat: number, long: number) {
  return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${GEOAPI_API_KEY}`)
    .then(res => res.json())
    .then(data => data["results"][0])
}