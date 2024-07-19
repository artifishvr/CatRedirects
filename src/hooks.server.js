import { sessionHooks } from "@kinde-oss/kinde-auth-sveltekit";
export const handle = async ({ event, resolve }) => {
    sessionHooks({ event });
    const response = await resolve(event);
    return response;
};