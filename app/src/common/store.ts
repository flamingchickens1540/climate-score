import { Writable, writable , Readable, readable} from 'svelte/store';

export var walkScore = writable(0);
export var wattData = writable(0);

export let renderForm = writable(true);
export let climateScore = writable(0);