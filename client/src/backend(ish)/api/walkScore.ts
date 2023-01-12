//fetch lat and long from the address with positionstack api
import {WALKSCORE_API_KEY } from '../../../../secrets/api_keys';


export async function getWalkScore (address: string): Promise<number> {
    const options = {
        credential: 'include',
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        mode: 'no-cors' as RequestMode,
    }
    const url = "https://api.walkscore.com/score?format=json&" + address + WALKSCORE_API_KEY;
    const response = await fetch(url, options);
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