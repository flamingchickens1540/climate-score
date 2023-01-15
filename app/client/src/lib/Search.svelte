<script lang="ts">
	import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
	import { onMount } from "svelte";
	// import type { Coords } from "../../common/types";
	export let promise = null;
	let autoDiv: HTMLDivElement;
	let selection = null;
	onMount(() => {
		const autocomplete = new GeocoderAutocomplete(
			autoDiv,
			"a944e82063ef4de9bfb572469d5b8eea",
			{
				type: "amenity",
				lang: "en",
				limit: 5,
				placeholder: "Enter a location",
				skipIcons: true,
				skipDetails: true,
			}
		);
		autocomplete.on("select", (loc) => {
			selection =
				loc == null
					? null
					: { lat: loc.properties.lat, long: loc.properties.lon };
		});
	});
	//function for the appstate that collects the data
	async function score() {
		const data = await fetch("/api/v1/score", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(selection),
		}).then((res) => res.json());
		if (data.error) throw new Error("Failed to generate climate score")
		
		return data
	}
	async function getScore(): Promise<void> {
		if (selection == null) await locScore();
		else {
			promise = score();
		}
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
	async function getLocFromIp(): Promise<any> {
		return fetch(`https://ipify.org/`) //get ip
			.then((res) => res.text())
			.then((ip) =>
				fetch(`https://ipapi.co/${ip}/json/`) //get location
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
	<div id="autocomplete" class="autocomplete-container" bind:this={autoDiv}/>
	<button on:click={getScore}>🔍</button>
</main>

<style>
	.autocomplete-container {
		position: relative;
		padding-left: 10px;
		padding-right: 10px;
		border-color: #43281C;
		z-index: inherit;
		color:#43281C;
	}

	main {
		display: flex;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}
</style>