<script lang="ts">
	//data is passed as a prop
	export let walkWeight: number;
	export let energyWeight: number;
	export let carbonWeight: number;
	export let data: any;

	const GASWEIGHT = -1;
	const HYDROWEIGHT = 1.5;
	const WINDWEIGHT = 1.5;
	const SOLARWEIGHT = 1.5;

	let walkscore = data["walkscore"];
	let adjustedCarbonFootprint = Math.round((100 - data["carbonFootprint"] / 370));
	console.log("adjusted footprint: " + adjustedCarbonFootprint);
	let energyScore = getEnergyScore(data);
	let climateScore = Math.round(((walkscore * walkWeight) + (adjustedCarbonFootprint * carbonWeight) + (energyScore * energyWeight)) / (walkWeight + energyWeight + carbonWeight) * .7);
	if(climateScore > 100) climateScore = 100;
	if(climateScore < 0) climateScore = 0;
	console.log(climateScore);

	

	function getEnergyScore(data: any): number {
		let energyScore = 0;

		energyScore += GASWEIGHT*(data.percentNaturalGas);

		energyScore += HYDROWEIGHT*(data.percentHydroelectric);

		energyScore += WINDWEIGHT*(data.percentWind);

		energyScore += SOLARWEIGHT*(data.percentSolar);

		return Math.round(energyScore);
	}

</script>

<!-- this displays each of the datapoints and paragraphs -->
<center class="box">
	<h2>{climateScore}</h2>
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
		Around {data.percentNaturalGas}% of this location's energy comes from natual gasses, around {data.percentHydroelectric}% comes from hydrioelectric power, about {data.percentSolar}% from solar, and {data.percentWind}% from wind.
		The rest comes from unaccounte for sources, likely nuclear, coal or wood if the house has a wooden stove or fireplace.
	</p>
	<h3>Carbon Footprint</h3>
	<p>
		Based off WattBuy's estimates, we found this property's carbon footprint to be around {data["carbonFootprint"]} lbs per year.
		Although this number is likely higher if this home is in an urban area, and lower if it's in a rural area.
		{#if data["carbonFootprint"] > 18500}
			The emissions of this property are about {data["carbonFootprint"] - 18500} lbs more than the average.
		{:else if data["carbonFootprint"] == 1850}
			This property is about average in emissions
		{:else}
			The emmissions of this property are about {18500 - data["carbonFootprint"]} lbs less than the average.
		{/if}

	</p>
</center>

<style>
	.box {
		width: 80%;
		border: 1px solid #aaa;
		border-radius: 50px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 4em;
		margin: 0 0 1em 0;
		margin-right: 50%;
		margin-bottom: -5%;
		margin-top: 4%;
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