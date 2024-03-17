<script>
    import { Card, Button, Heading, Toggle } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    export let data;

    let seconds = 10;

    let pauseredirect = false;

    onMount(() => {
        const interval = setInterval(() => {
            if (pauseredirect) {
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

<div class="bg-zinc-900 text-white py-20 flex h-screen text-center">
    <div class="m-auto rounded-lg drop-shadow-xl bg-zinc-800 border-zinc-700 p-6">
        <h1 class="text-4xl font-bold">{data.randomfeatured.name}</h1>
        <p class="text-sm">Chosen randomly</p>
        {#if !pauseredirect}
            <h3 class="text-2xl pb-5">Redirecting in {seconds} second{seconds !== 1 ? 's' : ''}!</h3>
        {/if}
        <Button>
            Go Now <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
        </Button>
        <Toggle bind:checked={pauseredirect}>Stop Redirecting</Toggle>
    </div>
</div>

<div class="p-5 dark:bg-zinc-800">
    <Heading tag="h2" customSize="text-4xl font-bold" class="pb-4">Full List</Heading>
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
