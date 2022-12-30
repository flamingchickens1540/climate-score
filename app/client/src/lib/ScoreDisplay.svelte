<script>
	//data is passed as a prop
	export let data
</script>

<!-- this displays each of the datapoints and paragraphs -->
<div class="box">
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
		margin-left: 37.5%;
	}
</style>