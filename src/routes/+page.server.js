import { kindeAuthClient } from "@kinde-oss/kinde-auth-sveltekit";

export async function load({ request }) {
  const isAuthenticated = await kindeAuthClient.isAuthenticated(request);
  return {
    isAuthenticated,
  };
}
