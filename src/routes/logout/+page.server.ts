import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    event.cookies.delete('sessionid', { path: '/' });
    redirect(303, '/signin')
};