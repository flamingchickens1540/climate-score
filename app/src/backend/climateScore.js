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
//Collects all the data from the apis and returns a climate score
//Parameters: address, city, state, zip, lat, long
//Returns: the climate score
function getClimateScore(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //Formats the address to be used in the position stack api
        const positionstackAddress = data.address + " " + data.street + " " + data.kindOfStreet + " " + data.cardinal + " " + data.cityName + " " + data.state;
        //Longitude and Latitude from positionstack that are needed for walkscore api
        const lon = (yield (0, walkScore_2.getPositionStack)(positionstackAddress)).data.results.longitude;
        const lat = (yield (0, walkScore_2.getPositionStack)(positionstackAddress)).data.results.latitude;
        const walkScoreAddress = `address=${data.address}%${data.street}%20${data.kindOfStreet}%20${data.cityName}%20${data.state}%${data.zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
        const walkScore = yield (0, walkScore_1.getWalkScore)(walkScoreAddress);
        //Formats the address to be used in the wattbuy api
        const wattBuyAddress = `address=${data.address}&city=${data.cityName}&state=${data.state}&zip=${data.zip}`;
        //Gets the energy score and the average carbon footprint from the wattbuy api
        const avgCarbonFootprint = yield (0, wattBuy_1.getAvgCarbonFootprint)(wattBuyAddress);
        const adjustedCarbonFootprint = avgCarbonFootprint * 0.0395;
        const energyScore = yield (0, wattBuy_1.getEnergyScore)(wattBuyAddress);
        //Calculates the climate score
        const climateScore = (walkScore + adjustedCarbonFootprint + energyScore) / 3;
        console.log('Climate Score: ' + climateScore);
        return climateScore;
    });
}
exports.getClimateScore = getClimateScore;
