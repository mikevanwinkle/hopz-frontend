import { readable, writable } from "svelte/store";

// const createWritableStore = (key, startValue) => {
//   const { subscribe, set } = writable(startValue);

//   return {
//     subscribe,
//     set,
//     useLocalStorage: () => {
//       const json = localStorage.getItem(key);
//       if (json) {
//         set(JSON.parse(json));
//       }

//       subscribe(current => {
//         localStorage.setItem(key, JSON.stringify(current));
//       });
//     }
//   };
// }

// export const sessionid = createWritableStore('sessionid', crypto.randomUUID());
export const sessionid = readable(crypto.randomUUID(), function start(set) {

  const interval = setInterval(() => {
    set(crypto.randomUUID());
  }, 1000 );

  return function stop() {
    clearInterval(interval);
  };
})

export const store = writable({
  user: {},
  token: '',
  device_id: crypto.randomUUID(),
})

export const errors = writable([])
export const messages = writable([])