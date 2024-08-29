import { db } from "$lib/db";
import { redirects } from "$lib/schema";
import { kindeAuthClient } from "@kinde-oss/kinde-auth-sveltekit";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ request }) {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(request);

  if (isAuthenticated) redirect(302, "/dash");

  try {
    const result = await db
      .select()
      .from(redirects)
      .where(eq(redirects.ownerid, "demo"));

    return {
      result,
    };
  } catch (error) {
    console.error(error);
  }
}
