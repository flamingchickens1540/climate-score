<script lang="ts">
	import Navbar from "./lib/Header.svelte";
	import ScoreDisplay from "./lib/ScoreDisplay.svelte";
	import Footer from "./lib/Footer.svelte";
	import Search from "./lib/Search.svelte";
	import ScoreLoading from "./lib/ScoreLoading.svelte";
	import ScoreError from "./lib/ScoreError.svelte";
	import Settings from "./lib/Settings.svelte";
	import Hamburger from "./lib/Hamburger.svelte";
	import { bind } from "svelte/internal";

	let promise;

	let open = false;
</script>

<main>
	<Navbar />
	{#if !promise}
		<Search bind:promise />
		<img
			src="https://www.iliketowastemytime.com/sites/default/files/eco_friendly_sky_garden_home1.jpg"
			alt="placeholder for map"
		/>
	{:else}
		{#await promise}
			<ScoreLoading />
		{:then data}
			<ScoreDisplay
				{data}
            />
		{:catch error}
			<ScoreError {error} />
		{/await}
	{/if}
	<!-- <Hamburger bind:open /> -->
	{#if open}
		<Settings />
	{/if}
	{#if !promise}
		<Footer />
	{/if}
</main>

<style>
    img{
        display: block;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        z-index: -1;   
    }
</style>
