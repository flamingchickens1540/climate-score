<script lang="ts">
	import { getWalkScore } from '../../bawkend/walkScore';
	import { getPositionStack } from '../../bawkend/walkScore';
	//Get WalkScore Data
	async function onSubmit(e) {	
		const formData = new FormData(e.target);
		const key = ""; //walkscore api key
        const address = formData.get('address');
        const street = formData.get('street').toString().split(" ")[0];
        const kindOfStreet = formData.get('street').toString().split(" ")[1];
		const cardinal = formData.get('cardinal');
        const cityName = formData.get('city');
        const state = formData.get('state');
        const zip = formData.get('zip');

		const wattBuyAddress = `address=${address}&city=${cityName}&state=${state}&zip=${zip}`;
		const wattBuy = await getWalkScore(wattBuyAddress);

		//get positionstack data to get lat and long for walkscore api
		const positionstackAddress = address + street + kindOfStreet + cardinal + cityName + state;

		const lon = getPositionStack(positionstackAddress)['data']['results']['longitude'];
		const lat = getPositionStack(positionstackAddress)['data']['results']['latitude'];
		
		const walkScoreAddress = `https://api.walkscore.com/score?format=json&address=${address}%${street}%20${kindOfStreet}%20${cityName}%20${state}%${zip}&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=`;

		const walkScore = await getWalkScore(walkScoreAddress);

		return walkScore;
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