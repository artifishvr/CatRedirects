<script>
  export let data;
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="bg-zinc-900 text-white py-24 flex h-screen text-center">
  <div class="m-auto p-6 w-128">
    <h1 class="text-6xl font-bold pb-4">gaycat.online</h1>
    <h3 class="text-2xl pb-5">subdomains for gay cats</h3>
    {#if data.isAuthenticated}
      <Button href="/dash">Dashboard</Button>
    {:else}
      <Button href="/api/auth/login" class="mx-2">Sign in</Button>
      <Button href="/api/auth/register" variant="secondary" class="mx-2"
        >Sign up</Button>
    {/if}

    <div class="text-sm text-gray-300 pt-8">
      <h6>
        Anyone can register a domain, but they may not be used to attack
        protected groups or host illegal content.
      </h6>
      <h6>
        Only supports redirects (and linking them to discord or bluesky). More
        options coming soon&trade;
      </h6>
    </div>
  </div>
</div>
