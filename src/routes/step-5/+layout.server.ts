import { PUBLIC_API_URL } from '$env/static/public'
import { GetStudentInfo, SetHeaderApi } from '$lib/Helper'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async event => {
  if (event.cookies.get('Instance')! == undefined) {
    redirect(307, '../signin')
  }

  const userakses = await GetStudentInfo(event.cookies)
  if (userakses.error) {
    redirect(307, '../unauthorized')
  }

  const GetTahapan = async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/student/editbytoken`, {
      method: 'POST',
      headers: SetHeaderApi(event.cookies),
    })

    const json = await result.json()
    return json.data
  }

  const tahapan = await GetTahapan()

  return {
    useraccess: userakses.data,
    studentdata: tahapan,
  }
}) satisfies LayoutServerLoad
