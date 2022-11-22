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
exports.getEnergyScore = exports.getAvgCarbonFootprint = void 0;
const api_keys_1 = require("../../secrets/api_keys");
const COALWEIGHT = -2;
const GASWEIGHT = -1;
const NUCLEARWEIGHT = .5;
const HYDROWEIGHT = 1;
const WINDWEIGHT = 1.1;
const SOLARWEIGHT = 1.1;
//query wattBuy api avg_carbon_footprint
function getWattBuy(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            credential: 'include',
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': api_keys_1.WATTBUY_API_KEY,
            },
            mode: 'no-cors',
        };
        const url = `https://apis.wattbuy.com/v3/electricity/carbon-footprint?${address}`;
        const response = yield fetch(url, options);
        const isJSONContentType = (_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('json');
        let data;
        if (isJSONContentType) {
            try {
                data = yield response.json();
            }
            catch (err) {
                console.warn(err);
                data = yield response.text();
                console.log({ data, headers: Object.fromEntries(response.headers.entries()), url: response.url });
            }
        }
        else {
            console.warn('Response is not json');
            data = yield response.text();
        }
        console.log(data);
        return data;
    });
}
function getAvgCarbonFootprint(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const wattBuy = yield getWattBuy(address);
        const avg_carbon_foot_print = wattBuy.data.avg_carbon_foot_print;
        console.log('avg_carbon_foot_print: ' + avg_carbon_foot_print);
        return avg_carbon_foot_print;
    });
}
exports.getAvgCarbonFootprint = getAvgCarbonFootprint;
function getEnergyScore(address) {
    return __awaiter(this, void 0, void 0, function* () {
        let energyScore = 0;
        const wattBuy = yield getWattBuy(address);
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
    });
}
exports.getEnergyScore = getEnergyScore;
