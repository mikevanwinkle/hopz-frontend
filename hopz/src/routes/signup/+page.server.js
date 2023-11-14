import { fail, redirect } from '@sveltejs/kit';

export function load({ cookies, form }) {
  if (cookies.get('hopztoken')) {
    throw redirect(301, `/account`)
  }

  return {
    token: cookies.get('hopztoken') || null,
    device_id: cookies.get('hopzsession'),
  }
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
  register: async ({ cookies, request }) => {
    let formData = await request.formData();
    const _data = {};

    if (!formData.get('name')) {
      return fail(422, {
        message: 'name is required',
        error: true,
        action: 'register',
        data: {
          email: formData.get('email'),
        }
      })
    }

    if (!formData.get('email')) {
      return fail(422, {
        message: 'email is required',
        error: true,
        action: 'register',
        data: {
          name: formData.get('name'),
        }
      })
    }

    if (formData.get('password') !== formData.get('confirm_password')) {
      return fail(422, {
        message: 'passwords do not match',
        error: true,
        action: 'register',
        data: {
          name: formData.get('name'),
          email: formData.get('email'),
        }
      })
    }

    return await fetch('https://api.hopheads.app/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
        role: "user",
        device_id: cookies.get('hopzsession'),
      })
    }).then((response) => {
      return response.json();
    }).then((resp) => {
      if (resp.success) {
        return {
          status: 200,
          message: 'Your account was created successfully. Look for an email to confirm your account. Then you\'ll be able to login.',
        }
      } else {
        return fail(400, {
          message: resp.error,
          error: true,
          action: 'register',
          data: {
            email: formData.get('email'),
            name: formData.get('name'),
          }
        })
      }
    }).catch((error) => {
      console.error('Error:', error);
      return fail(403, {
        message: error,
        action: 'register',
        error: true,
        data: {
          email: formData.get('email'),
        }
      })
    });
  },
  login: async ({ cookies, request }) => {
    let formData = await request.formData();
    let email = formData.get('email')
    if (!email || email?.includes('@') === false) {
      return fail(422, {
        message: 'email is required',
        error: true,
        data: {
          email: formData.get('email'),
        }
      })
    }

    let params = {
      email: formData.get('email'),
      password: formData.get('password'),
      device_id: formData.get('device_id')
    }

    console.log(params)

    return await fetch('https://api.hopheads.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        device_id: formData.get('device_id')
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      if (data.token) {
        // $store.token = data.token;
        cookies.set('hopztoken', data.token, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        throw redirect(301, `/account?token=${data.token}&device_id=${formData.get('device_id')}`)
        // return {
        //   success: true,
        //   token: data.token,
        // }
      } else if (data?.error) {
        console.log("ERROR:", data.error)
        return fail(403, {
          message: data.error,
          error: true,
          data: {
            email: formData.get('email'),
          }
        })
      }
    })
  }
}