import { validateToken } from '$lib/utils/user.js'
import { redirect } from '@sveltejs/kit';
import { getUser } from '$lib/utils/user.js'

export function load({cookies}) {
  let token = cookies.get('hopztoken')
  let sessionid = cookies.get('hopzsession')
  let valid = getUser(sessionid, token)
  if (valid.error) {
    console.log('invalid token')
    cookies.delete('hopztoken')
    cookies.delete('hopzsession')
    throw redirect(302, '/signup');
  } else {
    console.log('valid token')
  }

  return {
    user: valid,
  }
}