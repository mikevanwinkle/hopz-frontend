import { writable } from "svelte/store";

const device_id = crypto.randomUUID()
export const sessionid = writable(device_id);
