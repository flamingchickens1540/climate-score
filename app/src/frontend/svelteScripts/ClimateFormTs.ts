import { getClimateScore } from '../../backend/climateScore';
//Get WalkScore Data
async function onSubmit(form : any) {	
	const formData = new FormData(form.target);
	if(formData.get('address') != null || formData.get('cityName') != null || formData.get('state') != null || formData.get('zip') != null || formData.get('street') != null || formData.get('kindOfStreet') != null || formData.get('cardinal') != null){
		const address = formData.get('address')?.toString() ?? "";
		const street = formData.get('street')?.toString().split(" ")[0] ?? "";
		const kindOfStreet = formData.get('street')?.toString().split(" ")[1] ?? "";
		const cardinal = formData.get('cardinal')?.toString() ?? "";
		const cityName = formData.get('city')?.toString() ?? "";
		const state = formData.get('state')?.toString() ?? "";
		const zip = formData.get('zip')?.toString() ?? "";
		const climateScore = await getClimateScore(address, cityName, state, zip, street, kindOfStreet, cardinal);
		return climateScore;
	}else{
		alert("Please fill out the form");
		throw new Error("Please fill out all fields");
	}
}