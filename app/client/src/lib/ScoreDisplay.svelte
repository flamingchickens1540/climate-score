<script lang="ts">
	//1850 lbs per year is the average emissions of an American household
	//370 is the number that makes 1850 become 50, thus making the average useful
	
	import { walkWeight, carbonWeight, energyWeight } from '../stores';
	export let data: any;
	const COALWEIGHT: number = -1.5;
	const GASWEIGHT: number = -1;
	const NUCLEARWEIGHT: number = 1;
	const HYDROWEIGHT: number = 1.5;
	const WINDWEIGHT: number = 1.5;
	const SOLARWEIGHT: number = 1.5;
	const DEBUG: boolean = true;
	function getClimateScore() {
		let walkscore: number = data["walkscore"];
		let adjustedCarbonFootprint: number = Math.round((100 - data["carbonFootprint"] / 300));
		if(DEBUG) console.log("adjusted footprint: " + adjustedCarbonFootprint);

		let energyScore: any = getEnergyScore(data);

		let climateScore: number = Math.round(((walkscore * $walkWeight) + (adjustedCarbonFootprint * $carbonWeight) + (energyScore * $energyWeight)) / ($walkWeight + $energyWeight + $carbonWeight));
		if(climateScore > 100) climateScore = 100;
		if(climateScore < 0) climateScore = 0;
		if(DEBUG) console.log(climateScore);

		return climateScore
	}
	

	

	function getEnergyScore(data: any): number {
		let energyScore: number = 0;

		energyScore += COALWEIGHT*(data["Coal"] ?? 0);

		energyScore += GASWEIGHT*(data["Natural Gas"] ?? 0);

		energyScore += NUCLEARWEIGHT*(data["Nuclear"] ?? 0);

		energyScore += HYDROWEIGHT*(data["Hydroelectric"] ?? 0);

		energyScore += WINDWEIGHT*(data["Wind"] ?? 0);

		energyScore += SOLARWEIGHT*(data["Solar"] ?? 0);

		return Math.round(energyScore);
	}
	let climateScore = getClimateScore();
</script>

<!-- this displays each of the datapoints and paragraphs -->
<center class="box">
	<h3>Climate Score:</h3>
	<strong><h2>{climateScore}</h2></strong>
	<p>
		Based on the data we've received about your property, we would give this property a climate score of {climateScore}.
		This score came from many aspects of this property, such as its location, in relation to public spaces, energy sources, estimated carbon emisions based on area, etc.
		To get a more detailed report on each specific aspect, take a look at the sections below.
	</p>
	<h3>Location Data</h3>
	<p>
		Part of the data that went into calculating your score was the location of the property.
		For this we looked at how long it would take to get to public areas such as hospital or supermarkets. This data was gathered by Walk Score.
		Your this property was rated as a "{data["walkscoreDescription"]}" area.
	</p>
	<h3>Energy Sources</h3>
	<p>
		{data["Natural Gas"] ?? 0}% of this location's energy comes from natural gasses, {data["Coal"] ?? 0}% comes from coal, {data["Nuclear"] ?? 0}% of it comes from nuclear, around {data["Hydroelectric"] ?? 0}% comes from hydroelectric power, about {data["Solar"] ?? 0}% from solar, and {data["Wind"] ?? 0}% from wind.
	</p>
	<h3>Carbon Footprint</h3>
	<p>
		Based off WattBuy's estimates, we found this property's carbon footprint to be around {data["carbonFootprint"]} lbs per year.
		Although this number is likely higher if this home is in an urban area, and lower if it's in a rural area.
		{#if data["carbonFootprint"] > 15000}
			The emissions of this property are about {data["carbonFootprint"] - 15000} lbs more than the average.
		{:else if data["carbonFootprint"] == 15000}
			This property is about average in emissions
		{:else}
			The emmissions of this property are about {15000 - data["carbonFootprint"]} lbs less than the average.
		{/if}

	</p>
</center>

<style>
	.box {
		width: 80%;
		height: min-content;
		border: 1px solid #aaa;
		border-radius: 50px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding-top: 0em;
		padding-bottom: 0em;
		padding-left: 3em;
		padding-right: 3em;
		margin: 0 0 1em 0;
		position: absolute;
		left: 50%;
		top: 58%;
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
		color: #000000;
	}

	p {
		text-align: justify;
	}

	h2, h3 {
		font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
		text-align: center;
	}
</style>