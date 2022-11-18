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
        if (data.data.length === 0 || data.data[0].latitude === undefined || data.data[0].longitude === undefined) {
            throw new Error("Houston, we have a problem");
        }
        else {
            return data.data[0];
        }
    });
}
exports.getPositionStack = getPositionStack;
function getWalkScore(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = address + api_keys_1.WALKSCORE_API_KEY;
        const response = yield fetch(url);
        const data = yield response.json();
        return data.walkscore;
    });
}
exports.getWalkScore = getWalkScore;
