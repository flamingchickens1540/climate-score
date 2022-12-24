import type { AddressData } from "../common/types";
import { getWalkScore } from "./apis/walkScore";
import { getPositionStack } from "./apis/walkScore";
import { getEnergyScore, getAvgCarbonFootprint } from "./apis/wattBuy";
import { climateScore } from "../common/stores";

//Collects all the data from the apis and returns a climate score
//Parameters: address, city, state, zip, lat, long
//Returns: the climate score
export async function getClimateScore (data: AddressData) {
    //Formats the address to be used in the position stack api
    const positionstackAddress = data.address + " " + data.street + " " + data.kindOfStreet + " " + data.cardinal + " " + data.cityName + " " + data.state;

    //Longitude and Latitude from positionstack that are needed for walkscore api
    const lon = (await getPositionStack(positionstackAddress)).data.results.longitude;
    const lat = (await getPositionStack(positionstackAddress)).data.results.latitude;

    const walkScoreAddress: string = `address=${data.address}%${data.street}%20${data.kindOfStreet}%20${data.cityName}%20${data.state}%${data.zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
    const walkScore: number = await getWalkScore(walkScoreAddress);

    //Formats the address to be used in the wattbuy api
    const wattBuyAddress: string = `address=${data.address}&city=${data.cityName}&state=${data.state}&zip=${data.zip}`;
    //Gets the energy score and the average carbon footprint from the wattbuy api
    const avgCarbonFootprint: number = await getAvgCarbonFootprint(wattBuyAddress);
    const adjustedCarbonFootprint: number= avgCarbonFootprint * 0.0395;
    const energyScore: number = await getEnergyScore(wattBuyAddress);
    //Calculates the climate score
    const cliScore: number = (walkScore + adjustedCarbonFootprint + energyScore) / 3;

    console.log('Climate Score: ' + climateScore);

    climateScore.update(() => cliScore);
}
