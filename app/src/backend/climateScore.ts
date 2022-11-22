import { getWalkScore } from "./apis/walkScore";
import { getPositionStack } from "./apis/walkScore";
import { getEnergyScore, getAvgCarbonFootprint } from "./apis/wattBuy";

//collects all the data from the apis and returns a climate score
export async function getClimateScore (address: string, cityName: string, state: string, zip: string, street: string, kindOfStreet: string, cardinal: string): Promise<number> {

    //Gets positionstack data to get lat and long for walkscore api
    const positionstackAddress = address + street + kindOfStreet + cardinal + cityName + state;

    //longitude and latitude are needed for walkscore api
    const lon = (await getPositionStack(positionstackAddress)).data.results.longitude;
    const lat = (await getPositionStack(positionstackAddress)).data.results.latitude;

    const walkScoreAddress = `address=${address}%${street}%20${kindOfStreet}%20${cityName}%20${state}%${zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;
    const walkScore = await getWalkScore(walkScoreAddress);

    //Wattbuy api data
    const wattBuyAddress = `address=${address}&city=${cityName}&state=${state}&zip=${zip}`;

    const avgCarbonFootprint = await getAvgCarbonFootprint(wattBuyAddress);
    const adjustedCarbonFootprint = avgCarbonFootprint * -0.0395;
    const energyScore = await getEnergyScore(wattBuyAddress);

    const climateScore = (walkScore + adjustedCarbonFootprint + energyScore) / 3;

    console.log('Climate Score: ' + climateScore);
    return climateScore;
}