    <script lang="ts">
        import { getWalkScore } from '../../backend/apis/walkScore';
        import { getAvgCarbonFootprint } from '../../backend/apis/wattBuy';        
        import ClimateForm from '../components/ClimateForm.svelte';
        import Box from '../components/Box.svelte';
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
        //open a settings manu
        //Status: Incomplete
        //TODO: write function
        function handleMenu(x:any){
            x.classList.toggle("change");
        }
    </script>
    <h1 id="climate-header">Climate Score</h1>
    <div class="icon-bar">
    <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
    <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
    <a href="#" class="google"><i class="fa fa-google"></i></a>
    <a href="#" class="youtube"><i class="fa fa-youtube"></i></a>
    </div>

    <div class="container" id="menu-bar-div" on:click={handleMenu(this)} on:keydown={handleMenu(this)}>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>
    <!-- svelte-ignore missing-declaration -->
<div>
    <Box id="climate-form-box">
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

    #climate-header{
        position: absolute;
        width: 859px;
        height: 125px;

        font-family: 'Fira Sans';
        font-style: normal;
        font-weight: 600;
        font-size: 128px;
        line-height: 154px;

        color: #D3D3D3;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);   
    }

    #climate-footer{
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

