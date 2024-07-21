import { db } from '$lib/db';
import { redirects } from '$lib/schema';
import { eq } from 'drizzle-orm';

export async function POST({ request }) {
    const { host, url } = await request.json();

    const result = await db.select().from(redirects).where(eq(redirects.ownerid, userInfo.id));


    // Here you would update the domain in your database
    // For now, we'll just log the domain to the console
    console.log('Updating domain:', host);


    return new Response('Success!', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

