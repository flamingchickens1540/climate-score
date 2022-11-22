"use strict";
//fetch lat and long from the address with positionstack api
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
exports.getWalkScore = exports.getPositionStack = void 0;
const api_keys_1 = require("../../secrets/api_keys");
function getPositionStack(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://api.positionstack.com/v1/forward?access_key=${api_keys_1.POSITIONSTACK_API_KEY}&query=${address}&limit=1`;
        const response = yield fetch(url);
        const data = yield response.json();
        if (Object.keys(data.data).length === 0 || data.data.results.latitude === null || data.data.results.longitude === null) {
            console.log(data.data);
            throw new Error("Houston, we can't find the latitude and longitude of this address");
        }
        else {
            console.log(data.data[0]);
            return data.data[0];
        }
    });
}
exports.getPositionStack = getPositionStack;
function getWalkScore(address) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.walkscore.com/score?format=json&" + address + api_keys_1.WALKSCORE_API_KEY;
        const response = yield fetch(url);
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
            console.log('Response is not in json format');
            data = yield response.text();
        }
        console.log(data);
        return data.walkscore;
    });
}
exports.getWalkScore = getWalkScore;
