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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnClimateScore = exports.returnRenderForm = exports.climateScore = exports.renderForm = void 0;
const climateScore_1 = require("../../backend/climateScore");
exports.renderForm = true;
exports.climateScore = 0;
//Get WalkScore Data
function onSubmit(form) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    return __awaiter(this, void 0, void 0, function* () {
        const formData = form;
        if (formData instanceof HTMLFormElement) {
            if (formData.get('address') != null || formData.get('cityName') != null || formData.get('state') != null || formData.get('zip') != null || formData.get('street') != null || formData.get('kindOfStreet') != null || formData.get('cardinal') != null) {
                const data = {
                    address: (_b = (_a = formData.get('address')) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                    street: (_d = (_c = formData.get('street')) === null || _c === void 0 ? void 0 : _c.toString().split(" ")[0]) !== null && _d !== void 0 ? _d : "",
                    kindOfStreet: (_f = (_e = formData.get('street')) === null || _e === void 0 ? void 0 : _e.toString().split(" ")[1]) !== null && _f !== void 0 ? _f : "",
                    cardinal: (_h = (_g = formData.get('cardinal')) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : "",
                    cityName: (_k = (_j = formData.get('city')) === null || _j === void 0 ? void 0 : _j.toString()) !== null && _k !== void 0 ? _k : "",
                    state: (_m = (_l = formData.get('state')) === null || _l === void 0 ? void 0 : _l.toString()) !== null && _m !== void 0 ? _m : "",
                    zip: (_p = (_o = formData.get('zip')) === null || _o === void 0 ? void 0 : _o.toString()) !== null && _p !== void 0 ? _p : "",
                };
                const cliScore = yield (0, climateScore_1.getClimateScore)(data);
                exports.renderForm = false;
                exports.climateScore = cliScore;
                return cliScore;
            }
            else {
                exports.renderForm = true;
                throw new Error("Please fill out all fields");
            }
        }
    });
}
function returnRenderForm() {
    return exports.renderForm;
}
exports.returnRenderForm = returnRenderForm;
function returnClimateScore() {
    return exports.climateScore;
}
exports.returnClimateScore = returnClimateScore;
if (document.getElementsByTagName('form').length > 0) {
    (_a = document.getElementById("submit")) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
}
