<script>
    import '../app.pcss';
    import { dev } from '$app/environment';
    import { onMount } from 'svelte';

    onMount(() => {
        const analyticsScript = document.createElement('script');
        analyticsScript.defer = true;
        analyticsScript.dataset.domain = 'gaycat.online';
        analyticsScript.src = 'https://a.arti.lol/js/script.js';
        document.head.appendChild(analyticsScript);
    });
</script>

<svelte:head>
    <title>gay cats</title>
</svelte:head>

<slot />
