import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq } from 'drizzle-orm';
import { kindeAuthClient } from '@kinde-oss/kinde-auth-sveltekit';

export async function POST({ request }) {
    const { platform, content, host } = await request.json();

    const recordtoedit = await db.select().from(redirects).where(eq(redirects.host, host));

    if (!recordtoedit[0]) return new Response('Not Found', { status: 404 });

    if (!await kindeAuthClient.isAuthenticated(request)) return new Response('Not authenticated', { status: 401 });

    const userInfo = await kindeAuthClient.getUser(request);
    if (recordtoedit[0]?.ownerid != userInfo?.id) return new Response('No permissions to edit this', { status: 403 });

    if (platform.value != "discord" && platform.value != "atproto-did") return new Response('Invalid platform', { status: 400 });
    if (platform.value == "discord" && !content.match(/^dh=.{40}$/)) return new Response('Invalid content. Make sure it\'s exactly copied from the discord app. (Watch the video tutorial if you\'re not sure)', { status: 400 });
    if (platform.value == "atproto-did" && !content.match(/^did:plc:.{24}$/)) return new Response('Invalid content. Make sure it\'s exactly copied from bluesky. (Watch the video tutorial if you\'re not sure)', { status: 400 });

    await db.update(redirects)
        .set({ wkPrefix: platform.value, wkContent: content })
        .where(eq(redirects.host, host));


    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

