// src/lib/utils/device.js
import {writable, derived} from 'svelte/store';
// a SvelteKit provided variable that indicates if we're on browser
import {browser} from '$app/environment';

//default to 0 width - this won't be updated server side because svelte:window won't work server side
export const width = writable(0);
//this will be set server side, from the __layout.svelte component
export const mobile = writable(true);

//This store computes what device to render for
export const device = derived([width, mobile], ([width, mobile]) => {
    // if width is >1000 (px) or we're not on browser and a mobile view hasn't been requested
    if (width > 1000 || (!browser && !mobile)) {
        //then we're on desktop
        return 'desktop';
    // if width is >420 (px) then we're on the browser and we're on a tablet
    } else if (width > 420) {
        // we're on a tablet
        return 'tablet';
    } else {
        // if none of the previous conditions were satisfied, we're either not on a device >420px,
        // or we're on the server, and a mobile view has been requested
        return 'mobile';
    }
});