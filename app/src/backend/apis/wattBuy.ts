import { WATTBUY_API_KEY } from "../../../secrets/api_keys";

//query wattBuy api avg_carbon_footprint
export async function getAvgCarbonFootprint (address: string): Promise<number> {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        'x-api-key': WATTBUY_API_KEY,
        }
      };


    const url = `https://api.wattbuy.com/v3/electricity/carbon_footprint?${address}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data.avg_carbon_footprint;
}