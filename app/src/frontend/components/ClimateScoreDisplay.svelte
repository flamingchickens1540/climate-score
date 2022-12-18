<script type="ts" context="module">
    import { returnClimateScore } from "../svelteScripts/ClimateFormTs";
    let score = returnClimateScore();
</script>

<div id="score-display">
    {#await score then score}
        {#if score!=0}
            <p>Score: {score.toString()}</p>
        {:else}
            <p></p>
        {/if}
    {/await}
</div>
