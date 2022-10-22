<script typ="module" lang="ts">
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        'x-api-key': 'rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
        }
    };
    const svelte = require('/svelte/compiler');
    const result = svelte.compile(source, options)
    //import App from "../src/App.svelte"
    //import {wattBuy} from "../src/api/wattBuy"
    //import {options} from '../src/api/wattBuy';
    let data;
    function test(){
        console.log("test");
    }
    async function getWattBuy(){
        const response = await fetch('https://apis.wattbuy.com/v3/electricity/info?address=1515%20Se%20Umatilla%20St&state=Or&city=Portland&zip=97202', options);
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

    }
</script>

<body>
    <button id="wattBuy" on:click={handleGetWattBuy}>getWattBuy</button>
    <button id="wattDelete" on:click={removeWattBuy}>removeWattBuy</button>
    <button on:click={test}>test</button>
    
    {#await data}
        <p>...waiting</p>
    {:then number}
        <p>The number is {number}</p>
    {:catch error}
        <p id="red">{error.message}</p>
    {/await}


</body>

