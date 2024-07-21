import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq, and } from 'drizzle-orm';
import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';

export async function POST({ request }) {
    const { id } = await request.json();

    if (!await kindeAuthClient.isAuthenticated(request)) return new Response('Not authenticated', { status: 401 });

    const userInfo = await kindeAuthClient.getUser(request);

    const result = await db.delete(redirects).where(and(eq(redirects.id, id), eq(redirects.ownerid, userInfo.id)))

    if (result.rowsAffected !== 1) return new Response('Something went wrong!', { status: 500 });

    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

