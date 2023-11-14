// src/hooks.js
export function getSession(request) {
  return {
      mobile: request.headers['sec-ch-ua-mobile'] === '?1'
  }
}