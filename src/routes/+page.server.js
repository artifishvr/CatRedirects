import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';
import { redirect } from '@sveltejs/kit';

export async function load({ request }) {
    const isAuthenticated = await kindeAuthClient.isAuthenticated(
        request
    );

    if (isAuthenticated) redirect(302, '/dash');

    return {
        isAuthenticated
    };
}