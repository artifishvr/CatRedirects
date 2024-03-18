<script>
    import '../app.pcss';
    import { inject } from '@vercel/analytics';
    import { dev } from '$app/environment';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
    <title>gay cats</title>
</svelte:head>

<slot />
