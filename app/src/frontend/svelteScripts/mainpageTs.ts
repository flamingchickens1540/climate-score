import { getWalkScore } from '../../backend/apis/walkScore';
//import { getAvgCarbonFootprint } from '../../backend/apis/wattBuy';        
import ClimateForm from '../lib/ClimateForm.svelte';
import Box from '../lib/Box.svelte';
import Navbar from '../lib/Navbar.svelte';
import ClimateScoreDisplay from '../lib/ClimateScoreDisplay.svelte';
//for some reason it recognizes the file path and the function, but cannot resolve the import
//TODO: write frontend nice-ification functions for the data; build out the frontend to look nice
//TODO: turn backend into an actual backend
//TODO: fix api issues: 503 errors
import { walkScore } from '../../common/store';
import { wattData } from '../../common/store';
import { subscribe } from 'svelte/internal';
import { renderForm } from '../../common/store';

//Remove the WattBuy Data from the Screen 
//Status: Complete
export function removeWattBuyData(){
    wattData.update(() => 0);
}

//gets the walkscore data and displays it on the screen
//Status: Incomplete

export function testWalkScoreData(){
    getWalkScore("address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
    .then((walkScore) => {
        console.log(walkScore);
        walkScore = walkScore;
    });
}
////Gets the watt buy data and displays it on the screen
//Status: Incomplete
export function testWattBuyData(){
    /*
    getAvgCarbonFootprint("address=1515&city=Portland&state=Or&zip=97202")
    .then((carbon) => {
        console.log(carbon);
        wattData = carbon;
    });   
    */
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
        }
    };

    fetch('https://apis.wattbuy.com/v3/electricity/carbon-footprint?address=1515&city=Portland&state=Or&zip=97202', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            wattData.update(response => response);
        })
        .catch(err => console.error(err));
    }