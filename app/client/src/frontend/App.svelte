<script lang="ts">
	import Navbar from "./lib/Navbar.svelte";
	import ClimateForm from "./lib/ClimateForm.svelte";
	import BetterClimateForm from "./lib/BetterClimateForm.svelte";
	import ClimateScoreDisplay from "./lib/ClimateScoreDisplay.svelte";
	import Box from "./lib/Box.svelte";
	import { renderForm, walkScore, wattData } from "../common/stores";
	import { getWalkScore } from "../backend/apis/walkScore";
	//for some reason it recognizes the file path and the function, but cannot resolve the import
	//TODO: write frontend nice-ification functions for the data; build out the frontend to look nice
	//TODO: turn backend into an actual backend
	//TODO: fix api issues: 503 errors

	//Remove the WattBuy Data from the Screen
	//Status: Complete
	export function removeWattBuyData() {
		wattData.update(() => 0);
	}

	//gets the walkscore data and displays it on the screen
	//Status: Incomplete
	export function testWalkScoreData() {
		getWalkScore(
			"address=1515%Umatilla%20St%20Portland%20OR%97202&lat=45.463100&lon=-122.650520&transit=1&bike=1&wsapikey="
		).then((walkScore) => {
			console.log(walkScore);
			walkScore = walkScore;
		});
	}
	////Gets the watt buy data and displays it on the screen
	//Status: Incomplete
	export function testWattBuyData() {
		/*
        getAvgCarbonFootprint("address=1515&city=Portland&state=Or&zip=97202")
        .then((carbon) => {
            console.log(carbon);
            wattData = carbon;
        });   
        */
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				"x-api-key": "rsFQKFKcYk9FOyZuaNne12QHdHeRACtOCT29m5uh",
			},
		};

		fetch(
			"https://apis.wattbuy.com/v3/electricity/carbon-footprint?address=1515&city=Portland&state=Or&zip=97202",
			options
		)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				wattData.update((response) => response);
			})
			.catch((err) => console.error(err));
	}

	function changeRenderForm() {
		renderForm.update((value) => (value ? false : true));
	}

	let wScore: number;
	let wData: number;
	let rForm: boolean;
	walkScore.subscribe((value) => {
		wScore = value;
	});
	wattData.subscribe((value) => {
		wData = value;
	});
	renderForm.subscribe((value) => {
		rForm = value;
	});
</script>

<main>
	<Navbar />
	<div>
		<Box>
			<div id="box">
				{#if $renderForm}
					<button id="wattDelete" on:click={removeWattBuyData}
						>Remove Watt Buy</button
					>
					<button id="wattBuy" on:click={testWattBuyData}
						>Test Watt Buy</button
					>
					<button id="walkScore" on:click={testWalkScoreData}
						>Test Walk Score</button
					>
					<div id="address-data">
						<ClimateForm />
					</div>
				{:else}
					<div id="address-data">
						<ClimateScoreDisplay />
					</div>
				{/if}

				<button id="changeRenderForm" on:click={changeRenderForm}
					>Test Render Form</button
				>
			</div>
		</Box>
	</div>

	<div>
		{#if wScore != 0}
			<p>{wScore.toString()}</p>
		{:else}
			<p />
		{/if}
		{#if wData != 0}
			<p>Score: {wData.toString()}</p>
		{:else}
			<p />
		{/if}
	</div>

    <BetterClimateForm></BetterClimateForm>

	<div id="climate-footer" />
</main>

<style>

  /* #box{
      
      position: relative  ;
  } */

  /* #climate-header{
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
  /* .change .bar1 {
      transform: translate(0, 11px) rotate(-45deg);
  }


  /* Fade out the second bar */
  /*.change .bar2 {opacity: 0;}

  /* Rotate last bar */
  /*.change .bar3 {
      transform: translate(0, -11px) rotate(45deg);
  }

  #address-data{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  #screenshot{
      /* Screenshot_2022-11-07_160240-removebg-preview 1 */

      /*position: absolute;
      width: 928px;
      height: 164px;

      background: url(Screenshot_2022-11-07_160240-removebg-preview.png);
  }




</style>
