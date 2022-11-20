    <script lang="ts">
        import { getWalkScore } from '../../backend/apis/walkScore';
        import { getAvgCarbonFootprint } from '../../backend/apis/wattBuy';        
        import ClimateForm from '../components/ClimateForm.svelte';
        import Box from '../components/Box.svelte';
        import Hamburger from '../components/Hamburger.svelte';
        //for some reason it recognizes the file path and the function, but cannot resolve the import
        //TODO: write frontend nice-ification functions for the data; build out the frontend to look nice
        //TODO: turn backend into an actual backend
        //TODO: 

        var score = 0;
        var wattData = 0;

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
        //Gets the watt buy data and displays it on the screen
        //Status: Complete

        function testWattBuyData(){
            getAvgCarbonFootprint("addresxs=1515&city=Portland&state=Or&zip=97202")
            .then((data) => {
                console.log(data);
                wattData = data;
            });
        }

        //gets the walkscore data and displays it on the screen
        //Status: Complete

        function testWalkScoreData(){
            getWalkScore("https://apis.walkscore.com/score?format=json&address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
            .then((data) => {
                console.log(data);
                  score = data; 
            });
        }
        
    </script>
    <!-- svelte-ignore missing-declaration -->
    <div id="climate-header" class="topnav">
        <h1 id="header-text">Climate Score</h1>
            <Hamburger></Hamburger>
    </div>


    <!-- svelte-ignore missing-declaration -->
    <div>
        <Box    >
            <div>
                <button id="wattDelete" on:click={removeWattBuyData}>Remove Watt Buy</button>
                <button id="wattBuy" on:click={testWattBuyData}>Test Watt Buy</button>
                <button id="walkScore" on:click={testWalkScoreData}>Test Walk Score</button>
                <button id="test" on:click={test}>test</button>
                <div id="address-data">
                    <ClimateForm action="POST" id="address-form"></ClimateForm>
                </div>
            </div>
        </Box>
    </div>


    <div>
        {#await wattData then value}
            {#if value!=0}
                <p>{value.toString()}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
        {#await score then score}
            {#if score!=0}
                <p>Score: {score.toString()}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
    </div>

    <div id="climate-footer"></div>
    

<style>
    #climate-form-box{
        width: 300px;
        border: 1px solid #aaa;
        border-radius: 2px; 
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        padding: 1em;
        margin: 0 0 1em 0;
    }

    #climate-header{
        position: relative;
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        margin: auto;
        top: 0; 
        left: 0;
        padding: 10px;
        align-items: center !important;

        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 50px;
        vertical-align: middle;

        color: #D3D3D3;

        background-color: #25591F;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);   
    }
    #climate-header h1{
    }
    #climate-header .container{
        float: left;
        top: 0;
        width: 50px;
    }

    #climate-footer{
        position: absolute;
        width: 100%;
        height: 75px;
        left: 0;
        bottom: 0;
        text-align: center;
        margin: auto;
        padding: 10px;
        background-color: #25591F;
    }
    

    .container {
        display: inline-block;
        cursor: pointer;
    }

    .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: #333;
        margin: 6px 0;
        transition: 0.4s;
    }

    /* Rotate first bar */
    .change .bar1 {
        transform: translate(0, 11px) rotate(-45deg);
    }

    /* Fade out the second bar */
    .change .bar2 {opacity: 0;}

    /* Rotate last bar */
    .change .bar3 {
        transform: translate(0, -11px) rotate(45deg);
    }

    #address-data{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #screenshot{
        /* Screenshot_2022-11-07_160240-removebg-preview 1 */

        position: absolute;
        width: 928px;
        height: 164px;

        background: url(Screenshot_2022-11-07_160240-removebg-preview.png);
    }




</style>

