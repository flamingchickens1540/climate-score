<script lang="ts">

    function handleClick() {
        location.reload();
    }
</script>

<header>
    <nav class="flex" id="climate-score-header">
        <button id="logobutton" type="button" on:click={handleClick}><img id="logo" src="/climateScoreLogo.png" alt="climateLogo"></button>
        <h1 id="climate-score">Climate Score</h1>
        <!-- <h2 id="phone-num"></h2> -->
    </nav>
</header>

<style>
    #logo {
        width: 100%;
        height: 100%;
        border-radius: 10%;
        /* left: 1vw;
        top: 2vh;
        position: absolute; */
    }
    #logobutton {
        border: none;
        cursor: pointer;
        appearance: none;
        background-color: inherit;
        width: 8%;
        height: 85%;
        left: 0vw;
        top: 1.5vh;
        position: absolute;
    }

    #climate-score-header{
        position: absolute;
        width: 98.6vw;
        height: 75px;
        left: 0;
        top: 0;
        text-align: center;
        margin: auto;
        padding: 10px;
        background-color: #25591F;
    }
    
    h1 {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        color: #DCCDBC;
        -webkit-text-stroke: 3px #43281C;
        font-weight: 1000;
        font-size: 3.5em;
        position: absolute;
        left: 50%;
        top: 3%;
        transform: translate(-50%, -50%);
    }
    
    nav{
        background-color: #25591F;
    }
</style>