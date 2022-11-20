<script type="typescript">
    import Hamburger from "./Hamburger.svelte";

    export let sidebar = false;
</script>

<!-- svelte-ignore missing-declaration -->
<header class="flex justify-between bg-gray-200 p-2 items-center text-gray-600 border-b-2">
    <nav class="flex">
        <h1 id="climate-score-header">Climate Score</h1>
        <Hamburger bind:open={sidebar}/>
    </nav>
</header>

<style>
    #climate-score-header{
        position: relative;
        width: 100%;
        height: 75px;
        line-height: 75px;
        text-align: center;
        font-size: 3.5em;
        font-weight: 100;
        font-family: 'Fira Sans';
        margin-top: 0;
        margin-left: 0;
        padding: 0px;
        align-items: center !important;
    }
    nav{
        background-color: #25591F;
    }
</style>