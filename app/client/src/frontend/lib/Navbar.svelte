<script type="ts">
    import Hamburger from "./Hamburger.svelte";

    let sidebar1 = false;
    //export let sidebar = sidebar1;
</script>

<header class="flex justify-between bg-gray-200 p-2 items-center text-gray-600 border-b-2 topnav">
    <nav class="flex" id="climate-score-header">
        <h1>Climate Score</h1>
        <div id="hamburger-div">
            <Hamburger bind:open={sidebar1}/>
        </div>
    </nav>
</header>

<style>

    #hamburger-div {
        position: absolute;
        left: 20px;
        top: 20px;

    }
    /* #climate-score-header{
        position: relative;
        width: 100%;
        height: 30%;
        top: 0%;
        padding: 0%;
        line-height: 75px;
        text-align: center;
        font-size: 3.5em;
        font-weight: 100;
        font-family: 'Fira Sans';
        margin-top: 0;
        margin-left: 0;
        padding: 0px;
        align-items: center !important;
    } */

    #climate-score-header{
        position: absolute;
        width: 100%;
        height: 75px;
        left: 0;
        top: 0;
        text-align: center;
        margin: auto;
        padding: 10px;
        background-color: #25591F;
    }
    h1{
        font-family: 'Fira Sans';
        font-weight: 100;
        font-size: 3.5em;
        position: absolute;
        top: 0%;
        left: 40%;
    }
    
    nav{
        background-color: #25591F;
    }
</style>