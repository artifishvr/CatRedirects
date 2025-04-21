<script lang="ts">
    import {
        PUBLIC_KINDE_CONNECTION_DISCORD,
        PUBLIC_KINDE_CONNECTION_GITHUB,
        PUBLIC_KINDE_CONNECTION_TWITCH,
        PUBLIC_KINDE_CONNECTION_GITLAB,
    } from "$env/static/public";
    import * as Card from "$lib/components/ui/card/index.js";
    import LoginButton from "$lib/components/LoginButton.svelte";

    export let loading = false;
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
    <a href="/"> <h1 class="text-3xl font-bold pb-6">gaycat.online</h1></a>

    <Card.Root class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Login</Card.Title>
            <Card.Description>Signups are closed! Sorry!</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-4">
                <LoginButton
                    bind:loading
                    connection_id={PUBLIC_KINDE_CONNECTION_DISCORD}
                    ><svg
                        role="img"
                        class="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="#5865F2"
                        xmlns="http://www.w3.org/2000/svg"
                        ><title>Discord</title><path
                            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                        /></svg
                    >
                    Login with Discord</LoginButton
                >
                <LoginButton
                    bind:loading
                    connection_id={PUBLIC_KINDE_CONNECTION_TWITCH}
                    ><svg
                        role="img"
                        class="mr-2 h-4 w-4"
                        fill="#9146FF"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><title>Twitch</title><path
                            d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                        /></svg
                    >
                    Login with Twitch</LoginButton
                >
                <LoginButton
                    bind:loading
                    connection_id={PUBLIC_KINDE_CONNECTION_GITHUB}
                    ><svg
                        role="img"
                        viewBox="0 0 24 24"
                        class="mr-2 h-4 w-4"
                        fill="#FFFFFF"
                        xmlns="http://www.w3.org/2000/svg"
                        ><title>GitHub</title><path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        /></svg
                    >
                    Login with GitHub</LoginButton
                >
                <LoginButton
                    bind:loading
                    connection_id={PUBLIC_KINDE_CONNECTION_GITLAB}
                    ><svg
                        role="img"
                        viewBox="0 0 24 24"
                        class="mr-2 h-4 w-4"
                        fill="#FC6D26"
                        xmlns="http://www.w3.org/2000/svg"
                        ><title>GitLab</title><path
                            d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"
                        /></svg
                    >
                    Login with GitLab</LoginButton
                >
            </div>
        </Card.Content>
    </Card.Root>
</div>
