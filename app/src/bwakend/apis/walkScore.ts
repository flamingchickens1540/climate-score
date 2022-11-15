//fetch lat and long from the address with positionstack api

import { POSITIONSTACK_API_KEY, WALKSCORE_API_KEY } from "../../../secrets/api_keys";


export async function getPositionStack(address: string) {
    const url = `http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${address}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.data.length === 0 || data.data[0].latitude === undefined || data.data[0].longitude === undefined) {
        throw new Error("Houston, we have a problem");
    } else {
        return data.data[0];
    }
}

export async function getWalkScore (address: string): Promise<number> {
    const url = address + WALKSCORE_API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    return data.walkscore;
}

/*
//fetch walkscore api data
const response = await fetch(`https://api.walkscore.com/score?format=json&address=${address}%${street}%20${kindOfStreet}%20${cityName}%20${state}%${zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${key}`);	   
const data = await response.json();
if(response.ok){
    console.log(data);
    return data;
}else{
    throw new Error(data);
}
*/