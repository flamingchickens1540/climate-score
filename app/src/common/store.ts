import { writable , readable} from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';

export var walkScore:Writable<number> = writable(0);
export var wattData:Writable<number> = writable(0);

export let renderForm:Writable<boolean> = writable(true);
export let climateScore:Writable<number> = writable(0);

export let sidebar:Writable<boolean> = writable(false);