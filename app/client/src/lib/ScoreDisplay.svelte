<script>
	//data is passed as a prop
	export let walkWeight;
	export let energyWeight;
	export let carbonWeight;
	export let data;

	function getClimateScore() {
		let walkscore = data["walkscore"];
		let adjustedCarbonFootprint = data["carbonFootprint"] * 0.02
		//let energyScore = data[2];
		let energyScore = 60;
		let climateScore = Math.round(((walkscore * walkWeight) + (adjustedCarbonFootprint * carbonWeight) + (energyScore * energyWeight)) / (walkWeight + energyWeight + carbonWeight));
		console.log(climateScore);

		return climateScore
	}
	let climateScore = getClimateScore();
</script>

<!-- this displays each of the datapoints and paragraphs -->
<div class="box">
	<p>{climateScore}</p>
	<p>
		Based on the data we've received about your property, we would give this property a climate score of {climateScore}.
		This score came from many aspects of this property, such as its location, in relation to public spaces, energy sources, estimated carbon emisions based on area, 
	</p>
	{#each Object.entries(data) as [key, value]}
		<p><strong>{key}:</strong> {value}</p>
	{/each}	
</div>

<style>
	.box {
		width: 400px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
		margin: 0 0 1em 0;
		margin-right: 50%;
		margin-bottom: -5%;
		margin-top: 4%;
	}
</style>