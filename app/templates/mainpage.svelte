<script context="module" lang="ts">
    import { get } from "svelte/store";


    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
        }
    };
    let score;
    let data;
    //import App from "../src/App.svelte"
    //import {wattBuy} from "../src/api/wattBuy"
    //import {options} from '../src/api/wattBuy';
    function test(){
        console.log("test");
    }
    async function getWattBuy(){
        const response = await fetch('https://apis.wattbuy.com/v3/electricity/carbon-footprint?address=1515%20se%20umatilla%20st&city=portland&state=Or&zip=97202', options)
        const data = await response.text();
        if(response.ok){
            console.log(data);
            return data;
        }else{
            throw new Error(data);
        }
    }


    function handleGetWattBuy(){
        data = getWattBuy();
    }
    
    function removeWattBuy(){
        data = "";
    }

    async function computeScore(){
        return await queryWattBuy();//later we will add more apis
    }

    async function queryWattBuy(){
        let jsonData = JSON.parse(await getWattBuy());
        return jsonData.avg_carbon_foot_print;
    }
    async function displayScore(){
        score = await computeScore();
    }
    displayScore();
    //data = getWattBuy();
</script>

<body>
    <button id="wattBuy" on:click={getWattBuy}>getWattBuy</button>
    <button id="wattDelete" on:click={removeWattBuy}>removeWattBuy</button>
    <button on:click={test}>test</button>
    
    {#await data then value}
        {#if value !=null}
	        <p>{value}</p>
        {:else}
            <p></p>
        {/if}

        {#if score != null}
        <p id="climateScore">{score}</p>
        {:else}
            <p></p>
        {/if}
    {/await}   


</body>

