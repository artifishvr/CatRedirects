import { kindeAuthClient } from "@kinde-oss/kinde-auth-sveltekit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { connection_id } = await request.json();

  const redirecturl = await kindeAuthClient.login(request, {
    authUrlParams: {
      connection_id: connection_id,
    },
  });

  return new Response(redirecturl);
}
