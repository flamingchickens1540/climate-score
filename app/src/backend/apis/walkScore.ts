//fetch lat and long from the address with positionstack api

import { POSITIONSTACK_API_KEY, WALKSCORE_API_KEY } from '../../secrets/api_keys';


export async function getPositionStack(address: string): Promise<any> {
    const url = `http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${address}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if(Object.keys(data.data).length === 0 || data.data.results.latitude === null || data.data.results.longitude === null) {
        console.log(data.data);
        throw new Error("Houston, we can't find the latitude and longitude of this address");
    } else {
        console.log(data.data[0]);
        return data.data[0];
    }
}

export async function getWalkScore (address: string): Promise<number> {
    const url = "https://api.walkscore.com/score?format=json&" + address + WALKSCORE_API_KEY;
    const response = await fetch(url);
    const isJSONContentType = response.headers.get('content-type')?.includes('json');
    let data;
    if(isJSONContentType){
        try{
            data = await response.json();
        }catch(err){
            console.warn(err);
            data = await response.text();
            console.log({data,headers: Object.fromEntries(response.headers.entries()), url: response.url})
        }
        }else{
        console.log('Response is not in json format');
        data = await response.text();
        }
    console.log(data);
    return data.walkscore;
}