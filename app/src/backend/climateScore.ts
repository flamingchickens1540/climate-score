import type { AddressData } from "../common/types";
import { getWalkScore } from "./apis/walkScore";
import { getPositionStack } from "./apis/walkScore";
import { getEnergyScore, getAvgCarbonFootprint } from "./apis/wattBuy";

//Collects all the data from the apis and returns a climate score
//Parameters: address, city, state, zip, lat, long
//Returns: the climate score
export async function getClimateScore (data:AddressData): Promise<number> {

    //Formats the address to be used in the position stack api
    const positionstackAddress = data.address + " " + data.street + " " + data.kindOfStreet + " " + data.cardinal + " " + data.cityName + " " + data.state;

    //Longitude and Latitude from positionstack that are needed for walkscore api
    const lon = (await getPositionStack(positionstackAddress)).data.results.longitude;
    const lat = (await getPositionStack(positionstackAddress)).data.results.latitude;

    const walkScoreAddress = `address=${data.address}%${data.street}%20${data.kindOfStreet}%20${data.cityName}%20${data.state}%${data.zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
    const walkScore = await getWalkScore(walkScoreAddress);

    //Formats the address to be used in the wattbuy api
    const wattBuyAddress = `address=${data.address}&city=${data.cityName}&state=${data.state}&zip=${data.zip}`;
    //Gets the energy score and the average carbon footprint from the wattbuy api
    const avgCarbonFootprint = await getAvgCarbonFootprint(wattBuyAddress);
    const adjustedCarbonFootprint = avgCarbonFootprint * 0.0395;
    const energyScore = await getEnergyScore(wattBuyAddress);
    //Calculates the climate score
    const climateScore = (walkScore + adjustedCarbonFootprint + energyScore) / 3;

    console.log('Climate Score: ' + climateScore);
    return climateScore;
}