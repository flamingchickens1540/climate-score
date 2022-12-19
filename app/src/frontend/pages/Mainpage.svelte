<script lang="ts" context="module">
    import { removeWattBuyData, testWalkScoreData, testWattBuyData } from "../svelteScripts/mainpageTs";
    import Navbar from "../components/Navbar.svelte";
    import ClimateForm from "../components/ClimateForm.svelte";
    import Box from "../components/Box.svelte";
    import { renderForm } from "../../common/store";

    let render1:boolean;
    renderForm.subscribe(value =>{
        render1 = value;
    });
</script>
    <!-- svelte-ignore missing-declaration -->
    <Navbar></Navbar>
    <!-- svelte-ignore missing-declaration -->
    <div>
        <Box>
            <div id="box">
                {#if $render1 == true}
                    <button id="wattDelete" on:click={removeWattBuyData}>Remove Watt Buy</button>
                    <button id="wattBuy" on:click={testWattBuyData}>Test Watt Buy</button>
                    <button id="walkScore" on:click={testWalkScoreData}>Test Walk Score</button>
                    <div id="address-data">
                        <ClimateForm></ClimateForm>
                    </div>
                {:else}
                    <div id="address-data">
                        <ClimateScoreDisplay></ClimateScoreDisplay>
                    </div>
                {/if}
            </div>
        </Box>
    </div>


    <div>
        {#await $wattData then value}
            {#if value != 0}
                <p>{value.toString()}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
        {#await $walkScore then score}
            {#if score != 0}
                <p>Score: {score.toString()}</p>
            {:else}
                <p></p>
            {/if}
        {/await}
    </div>

    <div id="climate-footer"></div>
    

<style>

    #box{
        
        position: relative  ;
    }

    #climate-header{
        position: relative;
        width: 100%;
        height: 50%;
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

