"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testWattBuyData = exports.testWalkScoreData = exports.removeWattBuyData = void 0;
const walkScore_1 = require("../../backend/apis/walkScore");
const store_1 = require("../../common/store");
//Remove the WattBuy Data from the Screen 
//Status: Complete
function removeWattBuyData() {
    store_1.wattData.update(() => 0);
}
exports.removeWattBuyData = removeWattBuyData;
//gets the walkscore data and displays it on the screen
//Status: Incomplete
function testWalkScoreData() {
    (0, walkScore_1.getWalkScore)("address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
        .then((walkScore) => {
        console.log(walkScore);
        walkScore = walkScore;
    });
}
exports.testWalkScoreData = testWalkScoreData;
////Gets the watt buy data and displays it on the screen
//Status: Incomplete
function testWattBuyData() {
    /*
    getAvgCarbonFootprint("address=1515&city=Portland&state=Or&zip=97202")
    .then((carbon) => {
        console.log(carbon);
        wattData = carbon;
    });
    */
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
        }
    };
    fetch('https://apis.wattbuy.com/v3/electricity/carbon-footprint?address=1515&city=Portland&state=Or&zip=97202', options)
        .then(response => response.json())
        .then(response => {
        console.log(response);
        store_1.wattData.update(response => response);
    })
        .catch(err => console.error(err));
}
exports.testWattBuyData = testWattBuyData;
