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
exports.getAvgCarbonFootprint = void 0;
const api_keys_1 = require("../../secrets/api_keys");
//query wattBuy api avg_carbon_footprint
function getAvgCarbonFootprint(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-api-key': api_keys_1.WATTBUY_API_KEY,
            }
        };
        const url = `https://api.wattbuy.com/v3/electricity/carbon_footprint?${address}`;
        const response = yield fetch(url, options);
        const data = yield response.json();
        return data.avg_carbon_footprint;
    });
}
exports.getAvgCarbonFootprint = getAvgCarbonFootprint;
