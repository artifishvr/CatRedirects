<script>
  export let data;
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="bg-zinc-900 text-white py-24 flex h-screen text-center">
  <div class="m-auto p-6 w-96">
    <h1 class="text-6xl font-bold pb-4">gaycat.online</h1>
    <h3 class="text-2xl pb-5">v2 soon™️</h3>
    {#if data.isAuthenticated}
      <Button href="/dash">Dashboard</Button>
    {:else}
      <Button href="/api/auth/login">Sign in</Button>
    {/if}
  </div>
</div>
