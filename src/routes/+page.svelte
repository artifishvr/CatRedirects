<script>
    export let data;
    import { Button } from "$lib/components/ui/button/index.js";
</script>

<div
    class="bg-zinc-950 text-white flex flex-col justify-center items-center min-h-screen text-center"
>
    <h1 class="text-6xl font-bold pb-4">gaycat.online</h1>
    <h3 class="text-2xl pb-5">subdomains for gay cats</h3>
    {#if data.isAuthenticated}
        <Button href="/dash">Dashboard</Button>
    {:else}
        <div>
            <Button href="/auth" class="mx-2">Login</Button>
        </div>
    {/if}

    <div class="text-md text-gray-300 pt-8">
        <h6>
            Signups are now closed. Anyone that already has an account can still
            register a domain, for now.
        </h6>
    </div>

    <!-- <p class="absolute bottom-0 text-zinc-400 text-sm mb-8">
    with ❤️ by <a
      href="https://arti.gay"
      target="_blank"
      class="text-blue-300 underline">arti</a>
  </p> -->
</div>
