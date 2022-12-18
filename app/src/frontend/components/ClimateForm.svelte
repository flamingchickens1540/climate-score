<script lang="ts" context="module" src="../svelteScripts/ClimateFormTs">
	import { onSubmit } from "../svelteScripts/ClimateFormTs"
</script>

<!-- svelte-ignore missing-declaration -->
<form on:submit|preventDefault={onSubmit}>
	<div>
		<label for="name">Address</label>
		<input name="address" type="text" placeholder="1234" >
	</div>
	<div>
		<label for="name">Street</label>
		<input name="street" type="text" placeholder="IDONTKNOW Avenue" id="Street">
	</div>
	<div>
		<label for="name">City</label>
		<input name="city" type="text" placeholder="portland" id="City">
	</div>
	<div>
		<label for="name">State</label>
		<input name="state" type="text" placeholder="OR">
	</div>
	<div>
		<label for="name">Zip Code</label>
		<input name="zip" type="text" placeholder="12345">
	</div>
	<button type="submit" disabled id="submit">Submit</button>
</form>

<style>
	* {
      	box-sizing: border-box;
    }
    form {
		display: flex;
		flex-direction: column;
		width: 300px;
		margin-top: 50px;
		margin-bottom: 50px;
		margin-left: 50px;
		margin-right: 50px;
		display: inline-block;
		text-align: center;
		position: relative;
    }

    form > div{
		display: flex;
		justify-content: space-between;
		position: center;
    }

    form > div + * {
      	margin-top: 10px;
    }
</style>