import { writable } from "svelte/store";

const storedToken = localStorage.getItem("token");
export const token = writable(storedToken);

token.subscribe(value => {
  localStorage.setItem("token", value );
});
