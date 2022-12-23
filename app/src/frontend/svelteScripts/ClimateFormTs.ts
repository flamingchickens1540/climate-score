import { getClimateScore } from '../../backend/climateScore';
import type { AddressData } from '../../common/types';

import { climateScore } from '../../common/store';
import { renderForm } from '../../common/store';

//Get WalkScore Data
export async function onSubmit(form: HTMLFormElement | SubmitEvent)  {	
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
			const cliScore:number = await getClimateScore(data);
			renderForm.update(() => false);
			climateScore.update(() => cliScore);
			return cliScore;
			
		}else{
			renderForm.update(() => true);
			throw new Error("Please fill out all fields");
		}
	}
}

if(document.getElementsByTagName('form').length > 0){
	document.getElementById("submit")?.removeAttribute("disabled");
}