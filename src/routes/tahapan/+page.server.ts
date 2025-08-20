import { PUBLIC_API_FILE_URL } from '$env/static/public'
import { SetHeaderApi } from '$lib/Helper'
import type { Actions, PageServerLoad } from './$types'

export const load = (async event => {
  return {
    status: 200,
  }
}) satisfies PageServerLoad

export const actions: Actions = {
  uploadfoto: async ({ request, locals, cookies }) => {
    const formData = Object.fromEntries(await request.formData())
    let instance = formData.Instance

    const formDataUpload = new FormData()

    for (const name in formData) {
      formDataUpload.append(name, formData[name])
    }

    let response = await fetch(`${PUBLIC_API_FILE_URL}api/file/uploadphoto`, {
      method: 'POST',
      headers: SetHeaderApi(cookies),
      body: formDataUpload,
    })
    return { success: true }
  },
} satisfies Actions
