import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';
import { isValidUrl } from '$lib/utils';

export async function POST({ request }) {
    const { host, url } = await request.json();

    if (!host.match(/^[a-zA-Z0-9-]+$/)) return new Response('Invalid host! You can only use alphanumeric characters and dashes.', { status: 400 });
    if (!isValidUrl(url)) return new Response('That doesn\'t look like a valid URL!', { status: 400 });

    if (!await kindeAuthClient.isAuthenticated(request)) return new Response('Not authenticated', { status: 401 });

    const userInfo = await kindeAuthClient.getUser(request);

    const result = await db.select().from(redirects).where(eq(redirects.ownerid, userInfo.id));

    if ((await db.select().from(redirects).where(eq(redirects.host, host + ".gaycat.online"))).length != 0) return new Response('Host already in use', { status: 403 });

    if ((await kindeAuthClient.getPermission(request, "create:infinite")).isGranted) {
        await db.insert(redirects)
            .values({ url: url, host: host + ".gaycat.online", ownerid: userInfo.id });
    } else if ((await kindeAuthClient.getPermission(request, "create:five")).isGranted) {
        if (result.length >= 5) return new Response('You cannot create more than 5 redirects.', { status: 403 });

        await db.insert(redirects)
            .values({ url: url, host: host + ".gaycat.online", ownerid: userInfo.id });
    } else {
        if (result.length >= 1) return new Response('You can only create one redirect.', { status: 403 });

        await db.insert(redirects)
            .values({ url: url, host: host + ".gaycat.online", ownerid: userInfo.id });
    }

    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

