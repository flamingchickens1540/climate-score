import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export let walkScore:Writable<number> = writable(0);
export let wattData:Writable<number> = writable(0);

export let renderForm:Writable<boolean> = writable(true);
export let climateScore:Writable<number> = writable(0);

export let sidebar:Writable<boolean> = writable(false);