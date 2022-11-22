"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClimateScore = void 0;
const walkScore_1 = require("./apis/walkScore");
const walkScore_2 = require("./apis/walkScore");
const wattBuy_1 = require("./apis/wattBuy");
//collects all the data from the apis and returns a climate score
function getClimateScore(address, cityName, state, zip, street, kindOfStreet, cardinal) {
    return __awaiter(this, void 0, void 0, function* () {
        //Gets positionstack data to get lat and long for walkscore api
        const positionstackAddress = address + street + kindOfStreet + cardinal + cityName + state;
        //longitude and latitude are needed for walkscore api
        const lon = (yield (0, walkScore_2.getPositionStack)(positionstackAddress)).data.results.longitude;
        const lat = (yield (0, walkScore_2.getPositionStack)(positionstackAddress)).data.results.latitude;
        const walkScoreAddress = `address=${address}%${street}%20${kindOfStreet}%20${cityName}%20${state}%${zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
        const walkScore = yield (0, walkScore_1.getWalkScore)(walkScoreAddress);
        //Wattbuy api data
        const wattBuyAddress = `address=${address}&city=${cityName}&state=${state}&zip=${zip}`;
        const avgCarbonFootprint = yield (0, wattBuy_1.getAvgCarbonFootprint)(wattBuyAddress);
        const adjustedCarbonFootprint = avgCarbonFootprint * -0.0395;
        const energyScore = yield (0, wattBuy_1.getEnergyScore)(wattBuyAddress);
        const climateScore = (walkScore + adjustedCarbonFootprint + energyScore) / 3;
        console.log('Climate Score: ' + climateScore);
        return climateScore;
    });
}
exports.getClimateScore = getClimateScore;
