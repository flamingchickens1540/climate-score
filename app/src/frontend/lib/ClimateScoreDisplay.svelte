<script lang="ts">
    import { climateScore } from "../../common/store";
    

    let score: number;
    climateScore.subscribe(value =>{
        if(value != null) {
            score = value;
        }else {
            climateScore.set(0);
            score = value;
        }
        
    })
</script>

<div id="score-display">
    {#if score!=0}
        <p>Score: {score.toString()}</p>
    {:else}
        <p></p>
    {/if}
</div>
