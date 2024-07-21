import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';

export async function POST({ request }) {
    const { host, url } = await request.json();

    const recordtoedit = await db.select().from(redirects).where(eq(redirects.host, host + ".gaycat.online"));

    if (!recordtoedit[0]) return new Response('Not Found', { status: 404 });

    if (!await kindeAuthClient.isAuthenticated(request)) return new Response('Not authenticated', { status: 401 });

    const userInfo = await kindeAuthClient.getUser(request);
    if (recordtoedit[0]?.ownerid != userInfo?.id) return new Response('No permissions to edit this', { status: 403 });

    await db.update(redirects)
        .set({ url: url })
        .where(eq(redirects.host, host + ".gaycat.online"));


    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

