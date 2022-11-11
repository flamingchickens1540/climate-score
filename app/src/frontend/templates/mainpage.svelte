<body>

    <script lang="ts">
        import ClimateForm from '../objects/ClimateForm.svelte'
        const wattOptions = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            'x-api-key': ' rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh'
            }
        };
        var score;
        var data;
        
        //Test Function: Complete
        exportfunction test(){
            console.log("test");
        }
    
        //Get WattBuy Data: Complete 
        //more APIS HERE!
        
        //data = getWattBuy();
    
        //Call the getWattBuy Function When Someone Clicks the Button
        export function getWattBuyData(){
            data = getWattBuy();
        }
        
        //Remove the WattBuy Data from the Screen
        export function removeWattBuyData(){
            data = null;
        }
    
        //Compute Score Based On All APIs and Sources
        export async function computeScore(){
            //later we will add more apis
            var carbonFootprint = queryWattBuy();
            var footprintElement = document.createElement('p');
            footprintElement.innerText = JSON.stringify(carbonFootprint);
            return footprintElement;
        }
    
        //Query from the WattBuy API Data
        export async function queryWattBuy(){
            var jsonData = await getWattBuy();
            //we will get more properties from wattbuys later
            return jsonData['avg_carbon_foot_print'];
        }
    
        //Display the Climate Score
        export async function displayScore(){
            score = await computeScore();
            console.log(score);
        }
        //displayScore();
        
        //open a settings menu
        export function handleSettings(this){
    
        }
        //opens a menu sidebar
        export function handleMenu(this){
            this.classList.toggle("change");
        }
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
        <button id="wattBuy" on:click={getWattBuyData}>Get Watt Buy</button>
        <button id="wattDelete" on:click={removeWattBuyData}>Remove Watt Buy</button>
        <button id="climateScore" on:click={displayScore}>Get Climate Score</button>
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

