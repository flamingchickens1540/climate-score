<script lang="ts">
	import { GEOAPI_API_KEY } from "../../../../common/api_keys";
	import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
	import { onMount } from "svelte";
	import type { Coords } from "../../../../common/types";

	let autoDiv: HTMLDivElement;
	let selection: Coords = null;

	onMount(() => {
		const autocomplete = new GeocoderAutocomplete(autoDiv, GEOAPI_API_KEY, {
			type: "amenity",
			lang: "en",
			limit: 5,
			placeholder: "Enter a location",
			skipIcons: true,
			skipDetails: true,
		});

		autocomplete.on("select", (loc) => {
			selection = loc == null ? null : { lat: loc.properties.lat, long: loc.properties.lon };
		});
	});

	async function getScore(): Promise<void> {
		if (selection == null) await locScore()
		else{
			fetch('http://localhost:5137/score')
		} //make the request for the score
	}

	async function locScore(): Promise<void> {
		if (navigator.geolocation) {
			//find location with geolocator
			navigator.geolocation.getCurrentPosition(
				//successful geolocation
				(pos) => {
					selection = {
						lat: pos.coords.latitude,
						long: pos.coords.longitude,
					};
					
					getScore();
				},

				//failed geolocation
				async (_err) => {
					selection = await getLocFromIp();
					
					getScore();
				}
			);
		} else {
			//find location with ip
			selection = await getLocFromIp();

			getScore();
		}
	}

	async function getLocFromIp(): Promise<Coords> {
		return fetch(`https://ipify.org/`) //get ip
			.then((res) => res.text())
			.then((ip) => fetch(`https://ipapi.co/${ip}/json/`) //get location
				.then((res) => res.json())
				.then((data) => {
					return {
						lat: data.latitude,
						long: data.longitude,
					};
				})
			);
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		type="text/css"
		href="https://unpkg.com/@geoapify/geocoder-autocomplete@^1/styles/minimal.css"
	/>
</svelte:head>

<main>
	<button on:click={locScore}>🎯</button>
	<div id="autocomplete" class="autocomplete-container" bind:this={autoDiv} />
	<button on:click={getScore}>🔍</button>
</main>

<style>
	.autocomplete-container {
		position: relative;
	}

	main {
		display: flex;
	}
</style>
