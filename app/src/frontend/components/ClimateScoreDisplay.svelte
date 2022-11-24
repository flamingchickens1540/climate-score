<script type="ts">
import { climateScore } from "./ClimateForm.svelte";
let score = climateScore;
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
