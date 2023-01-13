import type { Writable } from "svelte/store";
import type { Readable } from "svelte/store";
import { writable } from "svelte/store";
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export let open: Writable<boolean> = writable(false);
export let carbonWeight: Writable<number> = writable(1);
export let energyWeight: Writable<number> = writable(1);
export let walkWeight: Writable<number> = writable(1);

