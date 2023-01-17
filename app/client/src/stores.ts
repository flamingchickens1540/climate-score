import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export let open = writable(false);
export let carbonWeight = writable(2);
export let energyWeight = writable(1);
export let walkWeight = writable(1.5);

