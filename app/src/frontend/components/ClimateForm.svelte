<script lang="typescript" context="module">
	import { getClimateScore } from '../../backend/climateScore';
	export let renderForm = true;
	export let climateScore = 0;
	//Get WalkScore Data
	async function onSubmit(form) {	
		const formData = new FormData(form.target);
		if(formData.get('address') != null || formData.get('cityName') != null || formData.get('state') != null || formData.get('zip') != null || formData.get('street') != null || formData.get('kindOfStreet') != null || formData.get('cardinal') != null){
			const address = formData.get('address')?.toString() ?? "";
			const street = formData.get('street')?.toString().split(" ")[0] ?? "";
			const kindOfStreet = formData.get('street')?.toString().split(" ")[1] ?? "";
			const cardinal = formData.get('cardinal')?.toString() ?? "";
			const cityName = formData.get('city')?.toString() ?? "";
			const state = formData.get('state')?.toString() ?? "";
			const zip = formData.get('zip')?.toString() ?? "";
			const cliScore = await getClimateScore(address, cityName, state, zip, street, kindOfStreet, cardinal);
			renderForm = false;
			climateScore = cliScore;
			return cliScore;
		}else{
			renderForm = true;
			throw new Error("Please fill out all fields");
		}
	}

	export function returnRenderForm(){
		return renderForm;
	}
	export function returnClimateScore(){
		return climateScore;
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<div>
		<label for="name">Address</label>
		<input name="address" type="text" placeholder="1234">
	</div>
	<div>
		<label for="name">Street</label>
		<input name="street" type="text" placeholder="IDONTKNOW Avenue">
	</div>
	<div>
		<label for="name">City</label>
		<input name="city" type="text" placeholder="portland">
	</div>
	<div>
		<label for="name">State</label>
		<input name="state" type="text" placeholder="OR">
	</div>
	<div>
		<label for="name">Zip Code</label>
		<input name="zip" type="text" placeholder="12345">
	</div>
	<button type="submit">Submit</button>
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