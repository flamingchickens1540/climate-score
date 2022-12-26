<script lang="ts" src="../svelteScripts/ClimateFormTs">

	import { getClimateScore } from '../../backend/climateScore';
	import type { AddressData } from '../../common/types';
	import { climateScore } from '../../common/stores';
	import { renderForm } from '../../common/stores';

	let climateScoreValue: number;
	climateScore.subscribe(value => climateScoreValue = value);

	//Get WalkScore Data
	export async function onSubmit(form: HTMLFormElement | Event) {
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
				getClimateScore(data);
				renderForm.update(() => false);

			}else{
				renderForm.update(() => true);
				throw new Error("Please fill out all fields");
			}
		}
	}

	//Checks if all fields are filled out
	// var inputs = document.getElementById('climate-form')?.getElementsByTagName('input')??[];
    // for (var i = 0; i < inputs.length; i++) {
	// 	if(inputs[i].value != ""){
	// 		document.getElementById("submit")?.removeAttribute("disabled");
	// 	}else{
	// 		document.getElementById("submit")?.setAttribute("disabled", "disabled");
	// 	}
	// }
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
		display: absolute;
		flex-direction: column;
		width: 300px;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: 50px;
		margin-right: 50px;
		display: inline-block;
		text-align: center;
		position: relative;
		padding: 0;
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