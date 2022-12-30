<script lang="ts">
	import Navbar from "./lib/Header.svelte";
	import ScoreDisplay from "./lib/ScoreDisplay.svelte";
	import Footer from "./lib/Footer.svelte";
	import Search from "./lib/Search.svelte";
	import ScoreLoading from "./lib/ScoreLoading.svelte";
	import ScoreError from "./lib/ScoreError.svelte";

    let promise;
</script>

<main>
	<Navbar/>
	<Search bind:promise={promise}></Search>
    {#if promise}
        {#await promise}
            <ScoreLoading></ScoreLoading>
        {:then data} 
            <ScoreDisplay data={data}></ScoreDisplay>
        {:catch error}
            <ScoreError></ScoreError>
        {/await}
    {:else}
        <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL21hcHMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9LCJ0b0Zvcm1hdCI6ImF2aWYifX0=" alt="placeholder for map">
    {/if}
	<Footer></Footer>
</main>

<style>
    img{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        margin-bottom: -100px;
    }
  /* #climate-header{
      position: relative;
      width: 100%;
      height: 50%;
      line-height: 75px;
      text-align: center;
      margin: auto;
      top: 0; 
      left: 0;
      padding: 10px;
      align-items: center !important;

      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 600;
      font-size: 50px;
      vertical-align: middle;

      color: #D3D3D3;

      background-color: #25591F;

      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);   
  }
  #climate-header h1{
  }
  #climate-header .container{
      float: left;
      top: 0;
      width: 50px;
  }

  #climate-footer{
      position: absolute;
      width: 100%;
      height: 75px;
      left: 0;
      bottom: 0;
      text-align: center;
      margin: auto;
      padding: 10px;
      background-color: #25591F;
  }
  

  .container {
      display: inline-block;
      cursor: pointer;
  }

  .bar1, .bar2, .bar3 {
      width: 35px;
      height: 5px;
      background-color: #333;
      margin: 6px 0;
      transition: 0.4s;
  }

  /* Rotate first bar */
  /* .change .bar1 {
      transform: translate(0, 11px) rotate(-45deg);
  }


  /* Fade out the second bar */
  /*.change .bar2 {opacity: 0;}

  /* Rotate last bar */
  /*.change .bar3 {
      transform: translate(0, -11px) rotate(45deg);
  }

  #address-data{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  #screenshot{
      /* Screenshot_2022-11-07_160240-removebg-preview 1 */

      /*position: absolute;
      width: 928px;
      height: 164px;

      background: url(Screenshot_2022-11-07_160240-removebg-preview.png);
  }




</style>
