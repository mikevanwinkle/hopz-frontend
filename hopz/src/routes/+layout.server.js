import { validateToken } from '$lib/utils/user.js'
import { redirect } from '@sveltejs/kit'
import { getUser } from '$lib/utils/user.js'

export async function load({cookies, url}) {
  let user = null
  if (!cookies.get('hopzsession')) {
    cookies.set('hopzsession', crypto.randomUUID(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    // redirect(301, )
  }

  if (cookies.get('hopztoken')) {
    try {
      user = await getUser(cookies.get('hopzsession'), cookies.get('hopztoken'))
      console.log("user loaded", user)
    } catch (e) {
      console.log("user not loaded", e)
      // cookies.delete('hopztoken')
      // cookies.delete('hopzsession')
    }
  }

  return {
    user: user,
    token: cookies.get('hopztoken'),
    device_id: cookies.get('hopzsession'),
  }
}