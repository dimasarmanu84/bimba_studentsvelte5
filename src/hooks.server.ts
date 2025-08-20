import { sequence } from '@sveltejs/kit/hooks'
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit'

const userSessionInterceptor = (async ({ event, resolve }) => {
  const session = event.cookies.get('Auth')
  //console.log(session);
  if (!session) {
    event.cookies.delete('Auth', { path: '/' })
  }

  const isUrlAllowed = !['/unauthorized', '/signin'].includes(event.url.pathname)
  if (isUrlAllowed && event.url.pathname.toString() != '/signin' && session == '') {
    //console.log('ss')
    throw redirect(303, '/signin')
  }

  return await resolve(event)
}) satisfies Handle

export const handle = sequence(userSessionInterceptor)
