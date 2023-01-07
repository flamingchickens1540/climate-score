<script>
    import { walkWeight, carbonWeight, energyWeight } from "../stores";
</script>

<main>
    <label for="walkWeight">
        <input type="number" bind:value={$walkWeight} min="0" max="5">
        <input type="range" bind:value={$walkWeight} min="0" max="5">
    </label>
    <label for="energyWeight">
        <input type="number" bind:value={$energyWeight} min="0" max="5">
        <input type="range" bind:value={$energyWeight} min="0" max="5">
    </label>
    <label for="carbonWeight">
        <input type="number" bind:value={$carbonWeight} min="0" max="5">
        <input type="range" bind:value={$carbonWeight} min="0" max="5">
    </label>
</main>

<style>
main{
    position:absolute;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    left:1vw;
}
main > label {
    float: left;
}
</style>