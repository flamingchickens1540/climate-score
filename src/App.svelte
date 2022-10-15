<script lang="ts">
  let count: number = 0
  function increment() {
    count += 1
  }
</script>

<!--Add this line to your web component-->
<svelte:options tag="climate-score" />

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    color: yellow;
    background-color: tan;
    border-color: yellow;
  }
</style>