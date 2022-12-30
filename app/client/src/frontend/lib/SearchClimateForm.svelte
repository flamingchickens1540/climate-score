<script lang="ts">
	import { GEOAPI_API_KEY } from "../../../../common/api_keys";
	import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
	import { onMount } from "svelte";

	let autoDiv: any;

	onMount(() => {
		const autocomplete = new GeocoderAutocomplete(
			autoDiv,
			GEOAPI_API_KEY,
			{
				"type": "amenity",
				"lang": "en",
				"limit": 5,
				"placeholder": "Enter a location",
				"skipIcons": true,
				"skipDetails": true,
			}
		);

		autocomplete.on("select", (location) => {
			console.log([location.properties.lat, location.properties.lon])
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		type="text/css"
		href="https://unpkg.com/@geoapify/geocoder-autocomplete@^1/styles/minimal.css"
	/>
</svelte:head>

<main>
	<button>🎯</button>
	<div
		id="autocomplete"
		class="autocomplete-container"
		bind:this={autoDiv}
	/>
	<button>🔍</button>
</main>

<style>
	.autocomplete-container {
		position: relative;
	}

	main {
		display: flex;
	}
</style>
