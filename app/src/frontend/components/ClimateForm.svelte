<script lang="ts" context="module">
	import { getClimateScore } from '../../backend/climateScore';
	import type { AddressData } from '../../types/types';
	export let renderForm = true;
	export let climateScore = 0;

	//Get WalkScore Data
	async function onSubmit(form: HTMLFormElement | SubmitEvent)  {	
		const formData = form;
		if(formData instanceof HTMLFormElement) {
			if(formData.get('address') != null || formData.get('cityName') != null || formData.get('state') != null || formData.get('zip') != null || formData.get('street') != null || formData.get('kindOfStreet') != null || formData.get('cardinal') != null){
			
			const data: AddressData = {
				address: formData.get('address')?.toString() ?? "",
				street: formData.get('street')?.toString().split(" ")[0] ?? "",
				kindOfStreet: formData.get('street')?.toString().split(" ")[1] ?? "",
				cardinal: formData.get('cardinal')?.toString() ?? "",
				cityName: formData.get('city')?.toString() ?? "",
				state: formData.get('state')?.toString() ?? "",
				zip: formData.get('zip')?.toString() ?? "",
			}
			const cliScore = await getClimateScore(data);
			renderForm = false;
			climateScore = cliScore;
			return cliScore;
		}else{
			renderForm = true;
			throw new Error("Please fill out all fields");
		}
		}
	}
	export function returnRenderForm(){
		return renderForm;
	}
	export function returnClimateScore(){
		return climateScore;
	}
	if(document.getElementsByTagName('form').length > 0){
		document.getElementById("submit")?.removeAttribute("disabled");
	}
</script>

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