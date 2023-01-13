<script lang="ts">
	import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
	import { onMount } from "svelte";
	import { initializeApp } from "firebase/app";
	import type { Coords } from "../../common/types";
	import { cliScore } from "../backend(ish)/climateScore";
	import { getFunctions, httpsCallable } from "firebase/functions";
	export let promise = null;
	//

	//Import the functions you need from the SDKs you need
	import { getAnalytics } from "firebase/analytics";
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: "AIzaSyBL3j1ttViXT5GzRsZzJaJ_ogy051KYY_k",
		authDomain: "climate-score-4885a.firebaseapp.com",
		projectId: "climate-score-4885a",
		storageBucket: "climate-score-4885a.appspot.com",
		messagingSenderId: "228724565089",
		appId: "1:228724565089:web:f098183feb3105cabbb620",
		measurementId: "G-Z5SZKYFRCD",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const analytics = getAnalytics(app);
	//
	let autoDiv: HTMLDivElement;
	let selection: Coords = null;
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
		const functions = getFunctions(app);
		const data = httpsCallable(functions, "score");
		let neoData: any;
		data(selection).then((result) => {
			// Read result of the Cloud Function.
			/** @type {any} */
			neoData = result.data;
		});
		// fetch("/score", {
		// 	method: "POST",
		// 	mode: "cors",
		// 	credentials: "same-origin",
		// 	headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
		// 	body: JSON.stringify(selection),

		// }).then((res) => res.json());
		/** @ts-ignore */
		if (neoData.error) throw new Error("Failed to generate climate score");

		return neoData;
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
	async function getLocFromIp(): Promise<Coords> {
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
	<div id="autocomplete" class="autocomplete-container" bind:this={autoDiv} />
	<button on:click={getScore}>🔍</button>
</main>

<style>
	.autocomplete-container {
		position: relative;
		padding-left: 10px;
		padding-right: 10px;
		border-color: #43281c;
		z-index: inherit;
	}

	main {
		display: flex;
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}
</style>
