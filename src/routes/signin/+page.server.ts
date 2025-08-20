import { PUBLIC_API_URL } from '$env/static/public'
import { type Actions, fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { loginSchema, registerSchema } from './login.schema'

export const load = (async ({ url, cookies }) => {
  cookies.delete('Auth', { path: '/' })
  cookies.delete('Instance', { path: '/' })

  const secret = url.searchParams.get('secret')
  const logintoken = async () => {
    const response = await fetch(`${PUBLIC_API_URL}api/sso/getstudentsessionbysecret?secret=${secret}`, { headers: { 'Content-Type': 'application/json' } })
    const { data: user } = await response.json()
    return { user }
  }

  if (secret) {
    let data = await logintoken()
    cookies.set('Auth', data.user.authhorization, { httpOnly: false, path: '/', sameSite: 'strict', maxAge: 3600 })
    cookies.set('Instance', data.user.institution_name, { httpOnly: false, path: '/', sameSite: 'strict', maxAge: 3600 })
    throw redirect(303, '/tahapan')
  }
  let emptyArray: never[] = []

  const dropdownInstitution = async () => {
    const url = `${PUBLIC_API_URL}api/sso/institution`
    const result = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await result.json()

    return {
      institution: json.data,
    }
  }

  const ddinstitution = await dropdownInstitution()

  const getregistrationperiod = async () => {
    const url = `${PUBLIC_API_URL}api/settings/periods/registrationperiod`
    const result = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await result.json()

    return json.data
  }

  const registrationperiod = await getregistrationperiod()

  return {
    dropdowninstitution: ddinstitution.institution,
    dropdowngoruplevel: emptyArray,
    dropdownlevel: emptyArray,
    registrationperiod: registrationperiod,
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  getsession: async ({ request, cookies }) => {
    const formData = Object.fromEntries(await request.formData())
    const validationResult = loginSchema.safeParse(formData)

    if (!validationResult.success) {
      const data = {
        errors: validationResult.error.flatten().fieldErrors,
      }
      return fail(400, data)
    }

    let response = await fetch(`${PUBLIC_API_URL}api/sso/getstudentsession`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        password: formData.userpassword,
      }),
    })

    const json = await response.json()

    if (json.error) {
      const data = {
        errors: { message: json.message },
      }
      return fail(400, data)
    }
    cookies.set('Auth', json.data.authhorization, { httpOnly: false, path: '/', sameSite: 'strict', maxAge: 3600 })
    cookies.set('Instance', json.data.institution_name, { httpOnly: false, path: '/', sameSite: 'strict', maxAge: 3600 })
    return { success: true }
  },

  create: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData())
    const validationResult = registerSchema.safeParse(formData)

    if (!validationResult.success) {
      let errors = validationResult.error.errors.map(error => {
        return {
          field: error.path[0],
          err: error,
          message: error.message,
        }
      })
      return fail(400, { error: true, errors })
    }


    let instance = formData.Instance.toString()
    let response = await fetch(`${PUBLIC_API_URL}api/master/register/insert/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Instance: instance },
      body: JSON.stringify({
        student_data: {
          student_name: formData.student_name,
          registrationlocation_id: Number(formData.institution_id),
          level_id: Number(formData.level_id),
          student_email: formData.student_email,
          student_mother_phonewa: formData.student_mother_phonewa,
          student_father_phonewa: formData.student_father_phonewa,
          student_gender: formData.student_gender,
          period_year: formData.period_year,
        },
        username: formData.username,
        password: formData.password,
      }),
    })
    const json = await response.json()



    if (!response.ok || json.error) {
      return fail(400, { errors: { message: json.message } })
    }
    return { success: true }
  },
} satisfies Actions
