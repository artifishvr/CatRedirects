<script>
    import { Card, Button, Heading, Toggle, Avatar } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import { browser, dev } from '$app/environment';
    import { PUBLIC_PROJECTID, PUBLIC_BUCKETID } from '$env/static/public';

    export let data;

    let seconds = 10;

    let pauseredirect = false;

    onMount(() => {
        const interval = setInterval(() => {
            if (pauseredirect || dev) {
                seconds = 10;
                return;
            }
            seconds -= 1;
            if (seconds === 0) {
                clearInterval(interval);

                window.location.href = data.randomfeatured.catlink;
            }
        }, 1000);
    });
</script>

<div class="bg-zinc-900 text-white py-20 flex h-screen-1/2 text-center">
    <div class="m-auto p-6 w-96">
        {#if browser && data.randomfeatured.pfpid}
            <Avatar
                class="mb-4 inline-flex items-center"
                size="xl"
                src="https://back.arti.lol/v1/storage/buckets/{PUBLIC_BUCKETID}/files/{data.randomfeatured
                    .pfpid}/view?project={PUBLIC_PROJECTID}" />
        {:else}
            <Avatar class="mb-4 inline-flex items-center" size="xl"></Avatar>
        {/if}
        <h1 class="text-6xl font-bold pb-4">{browser ? data.randomfeatured.name : '...'}</h1>
        {#if !pauseredirect}
            <h3 class="text-2xl pb-5">Redirecting in {seconds} second{seconds !== 1 ? 's' : ''}!</h3>
        {:else}
            <h3 class="text-2xl pb-5">Redirecting is paused.</h3>
        {/if}

        <a href={browser ? data.randomfeatured.catlink : '#'}>
            <Button class="w-full mb-5">
                Go Now <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
            </Button>
        </a>

        <Toggle class="inline-flex items-center" bind:checked={pauseredirect}>Stop Redirecting</Toggle>
    </div>
</div>

<div class="p-5 dark:bg-zinc-800">
    <Heading tag="h2" customSize="text-4xl font-bold" class="pb-4">Full List</Heading>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each data.cats as cat}
            <div class="space-y-4">
                <Card class="shadow-lg  dark:bg-zinc-700">
                    <h5 class="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">{cat.name}</h5>
                    <a href={cat.catlink} target="_blank"
                        ><h5 class="mb-2 text-sm font-medium tracking-tight text-gray-900 dark:text-white">{cat.catlink}</h5></a>
                    <a href={cat.catlink} target="_blank">
                        <Button>
                            go <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
                        </Button>
                    </a>
                </Card>
            </div>
        {/each}
    </div>
</div>
