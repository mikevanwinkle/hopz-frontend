import { writable } from "svelte/store";
export const user = writable(null);

export const getUser = (sessionid, token) => {
  return fetch('https://api.hopheads.app/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
      'X-Hopz-Device-Id': sessionid,
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return data;
  }).catch((error) => {
    console.error('Error:', error);
    return false;
  });
};

export const validateToken = async (sessionid, token) => {
  return fetch(`https://api.hopheads.app/auth/validate?token=${token}&${sessionid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    return response.json();
  }).then((data) => {
    return data;
  }).catch((error) => {
    console.error('Error:', error);
    return false;
  });
}
