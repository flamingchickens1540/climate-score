import { getWalkScore } from '../../backend/apis/walkScore';
//import { getAvgCarbonFootprint } from '../../backend/apis/wattBuy';        
import ClimateForm from '../components/ClimateForm.svelte';
import Box from '../components/Box.svelte';
import Navbar from '../components/Navbar.svelte';
import ClimateScoreDisplay from '../components/ClimateScoreDisplay.svelte';
import { returnRenderForm } from '../components/ClimateForm.svelte';
//for some reason it recognizes the file path and the function, but cannot resolve the import
//TODO: write frontend nice-ification functions for the data; build out the frontend to look nice
//TODO: turn backend into an actual backend
//TODO: fix api issues: 503 errors
export var walkScore = 0;
export var wattData = 0;

//Test Function
//Complete 
//TODO: Remove
function test(){
    console.log("test");
}
//Remove the WattBuy Data from the Screen 
//Status: Complete
function removeWattBuyData(){
    wattData = 0;
}

//gets the walkscore data and displays it on the screen
//Status: Incomplete

function testWalkScoreData(){
    getWalkScore("address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
    .then((walkScore) => {
        console.log(walkScore);
          walkScore = walkScore;
    });
}
////Gets the watt buy data and displays it on the screen
//Status: Incomplete
function testWattBuyData(){
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
        wattData = response;
    })
    .catch(err => console.error(err));
}
let renderForm = returnRenderForm();