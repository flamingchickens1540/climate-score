import { getWalkScore } from '../../backend/apis/walkScore';
import { getAvgCarbonFootprint } from '../../backend/apis/wattBuy';        
// import ClimateForm from '../components/ClimateForm.svelte';
// import Box from '../components/Box.svelte';
//TODO: figure out why importation isn't working even though it recognizes the file pathname
//for some reason it recognizes the file path and the function, but cannot resolve the import
//TODO: write frontend nice-ification functions for the data; build out the frontend to look nice


var score = 0;
var wattData = 0;

//Test Function
//Complete 
//TODO: Remove
function test(){
    console.log("test");
}
//open a settings manu
//Status: Incomplete
//TODO: write function
function handleMenu(){
    console.log("handleMenu");
}
//Remove the WattBuy Data from the Screen 
//Status: Complete
function removeWattBuyData(){
    wattData = 0;
}
//Gets the watt buy data and displays it on the screen
//Status: Complete

function testWattBuyData(){
    getAvgCarbonFootprint("address=1515&city=Portland&state=Or&zip=97202")
    .then((data) => {
        console.log(data);
        wattData = data;
    });
}

//gets the walkscore data and displays it on the screen
//Status: Complete

function testWalkScoreData(){
    getWalkScore("https://api.walkscore.com/score?format=json&address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
    .then((data) => {
        console.log(data);
        score = data;
    });
}