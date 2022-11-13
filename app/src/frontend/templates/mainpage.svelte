<body>
    <script lang="ts">
        import { getWalkScore } from '../../bawkend/walkScore';
        import {getAvgCarbonFootprint} from '../../bawkend/wattBuy';
        import ClimateForm from '../objects/ClimateForm.svelte'

        var score;
        var wattData;
        
        //Test Function: Complete
        function test(){
            console.log("test");
        }
                    
        //Remove the WattBuy Data from the Screen
        function removeWattBuyData(){
            wattData = null;
        }

        function getWattBuyData(){
            getAvgCarbonFootprint("1515 SE Umatilla St, Portland, OR 97202")
            .then((data) => {
                console.log(data);
                wattData = data;
            });
        }

        function getWalkScoreData(){
            getWalkScore("https://api.walkscore.com/score?format=json&address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey=")
            .then((data) => {
                console.log(data);
                score = data;
            });
        }
        
=        
    </script>

    <div class="icon-bar">
    <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
    <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
    <a href="#" class="google"><i class="fa fa-google"></i></a>
    <a href="#" class="youtube"><i class="fa fa-youtube"></i></a>
    </div>

    <div class="container" id="menu-bar-div" on:keydown={handleMenu}>
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    <div>
        <button id="wattBuy" on:click={getWattBuyData}>Test Watt Buy</button>
        <button id="wattDelete" on:click={removeWattBuyData}>Remove Watt Buy</button>
        <button id="walkScore" on:click={getWalkScore}>Test Walk Score</button>
        <button id="test" on:click={test}>test</button>
        <div id="address-data">
            <ClimateForm action="POST" id="address-form"></ClimateForm>
        </div>
    </div>
    
    
    <div>
        {#await data then value}
            {#if value!=null}
                <p>{value}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
        {#await score then score}
            {#if score!=null}
                <p>Score: {score}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
    </div>
    


</body>

<style>

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

    #header{
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

    #screenshot{
        /* Screenshot_2022-11-07_160240-removebg-preview 1 */

        position: absolute;
        width: 928px;
        height: 164px;

        background: url(Screenshot_2022-11-07_160240-removebg-preview.png);
    }




</style>

