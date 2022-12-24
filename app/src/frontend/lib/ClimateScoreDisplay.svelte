<script lang="ts">
    import { climateScore } from "../../common/stores";    

    let climateScoreValue: number;
    climateScore.subscribe(value =>{
        if(value != null) {
            climateScoreValue = value;
        }else {
            climateScore.set(0);
            climateScoreValue = value;
        }
        
    })
</script>

<div id="score-display">
    {#if climateScoreValue!=0}
        <p>Score: {climateScoreValue.toString()}</p>
    {:else}
        <p></p>
    {/if}
</div>
