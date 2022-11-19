<script type="typescript">
    import Hamburger from "./Hamburger.svelte";

    export let sidebar = false;
</script>

<!-- svelte-ignore missing-declaration -->
<header class="flex justify-between bg-gray-200 p-2 items-center text-gray-600 border-b-2">
    <nav class="flex">
        <Hamburger bind:open={sidebar}/>
    </nav>
</header>