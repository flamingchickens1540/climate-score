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
//query wattBuy api avg_carbon_footprint
function getWattBuy(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh',
                'content-type': 'application/json',
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
            console.log('response is not json');
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
        energyScore -= 2 * (wattBuy.data.estimated_generation_data[0]);
        //Nuclear
        energyScore += 0.5 * (wattBuy.data.estimated_generation_data[1]);
        //Natural Gas
        energyScore -= (wattBuy.data.estimated_generation_data[2]);
        //Hydro
        energyScore += (wattBuy.data.estimated_generation_data[3]);
        //Wind
        energyScore += 1.1 * (wattBuy.data.estimated_generation_data[4]);
        //Solar
        energyScore += 1.1 * (wattBuy.data.estimated_generation_data[5]);
        console.log('energyScore: ' + energyScore);
        return 2 * (energyScore / 6);
    });
}
exports.getEnergyScore = getEnergyScore;
