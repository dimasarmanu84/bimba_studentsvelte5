import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
  event.cookies.delete('Auth', { path: '/' });
  redirect(303, '/tahapan')
};