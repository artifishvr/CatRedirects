import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';

export async function POST({ request }) {
    const { host, url } = await request.json();

    if (!await kindeAuthClient.isAuthenticated(request)) return new Response('Not authenticated', { status: 401 });

    const userInfo = await kindeAuthClient.getUser(request);

    const result = await db.select().from(redirects).where(eq(redirects.ownerid, userInfo.id));

    if ((await kindeAuthClient.getPermission(request, "create:infinite")).isGranted) {
        await db.insert(redirects)
            .values({ url: url, host: host, ownerid: userInfo.id });
    } else if ((await kindeAuthClient.getPermission(request, "create:five")).isGranted) {
        if (result.length >= 5) return new Response('You cannot create more than 5 redirects.', { status: 403 });

        await db.insert(redirects)
            .values({ url: url, host: host, ownerid: userInfo.id });
    } else {
        if (result.length >= 1) return new Response('You can only create one redirect.', { status: 403 });

        await db.insert(redirects)
            .values({ url: url, host: host, ownerid: userInfo.id });
    }

    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

