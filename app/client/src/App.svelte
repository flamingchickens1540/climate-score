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
			src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL21hcHMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0="
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
	<Hamburger bind:open />
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
        width: 73%;
        height: 73%;
        border-radius: 100%;
        z-index: -1;   
    }
</style>
