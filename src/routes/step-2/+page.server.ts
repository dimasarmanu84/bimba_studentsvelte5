import { PUBLIC_API_URL } from '$env/static/public'
import { SetHeaderApi } from '$lib/Helper'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { datapribadiSchema } from './datapribadi.schema'

export const load = (async event => {
  if (event.cookies.get('Instance')! == undefined) {
    redirect(307, '../signin')
  }

  return {
    status: 200,
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  updatestudent: async ({ request, locals, cookies }) => {
    let oo = await request.formData()
    const formData = Object.fromEntries(oo)
    let instance = formData.Instance
    let complete = false
    const validationResult = datapribadiSchema.safeParse(formData)

    const object: Record<string, any> = { ...formData }
    let errors
    if (!validationResult.success) {
      errors = validationResult.error.errors.map(error => {
        return {
          field: error.path[0],
          err: error,
          message: error.message,
        }
      })

      // fail(400, { error: true, errors })
    }

    // parse dates
    if (object.student_dob_year && object.student_dob_month && object.student_dob_day) {
      object.student_dob = `${object.student_dob_year}-${object.student_dob_month}-${object.student_dob_day}`
    } else {
      delete object.student_dob
    }

    if (object.student_father_dob_year && object.student_father_dob_month && object.student_father_dob_day) {
      object.student_father_dob = `${object.student_father_dob_year}-${object.student_father_dob_month}-${object.student_father_dob_day}`
    } else {
      delete object.student_father_dob
    }

    if (object.student_mother_dob_year && object.student_mother_dob_month && object.student_mother_dob_day) {
      object.student_mother_dob = `${object.student_mother_dob_year}-${object.student_mother_dob_month}-${object.student_mother_dob_day}`
    } else {
      delete object.student_mother_dob
    }

    object.student_id = Number(object.student_id)
    object.student_order_family = Number(object.student_order_family) || 0
    object.student_number_siblings = Number(object.student_number_siblings) || 0
    object.student_height = Number(object.student_height) || 0
    object.student_weight = Number(object.student_weight) || 0
    object.levelgroup_id = Number(object.levelgroup_id)
    object.level_id = Number(object.level_id)
    object.registrationlocation_id = Number(object.registrationlocation_id) || 0

    if (!errors) {
      if (object.registrationstep_id == 2) {
        object.registrationstep_id = Number(3)
        complete = true
      } else {
        delete object.registrationstep_id
      }
    } else {
      delete object.registrationstep_id
    }

    var jsonRequest = JSON.stringify(object)

    let response = await fetch(`${PUBLIC_API_URL}api/master/student/update/` + formData.student_id, {
      method: 'POST',
      headers: SetHeaderApi(cookies),
      body: jsonRequest,
    })

    if (!response.ok) {
      const data = {
        errors: { message: 'Data tidak dapat disimpan' },
      }
      return fail(400, data)
    }

    let json = await response.json()
    if (json.error) {
      const data = {
        errors: { message: json.message },
      }
      return fail(400, data)
    }

    return { success: true, iscompelete: complete }
  },
} satisfies Actions
