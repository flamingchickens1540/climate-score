import type { Writable } from "svelte/store";
import type { Readable } from "svelte/store";
import { writable } from "svelte/store";
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export let open: Writable<Boolean> = writable(false);
export let carbonWeight: Writable<Number> = writable(1);
export let energyWeight: Writable<Number> = writable(1);
export let walkWeight: Writable<Number> = writable(1);

