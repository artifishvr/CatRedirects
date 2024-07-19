<script>
  export let data;
</script>

<div class="bg-zinc-900 text-white py-24 flex h-screen text-center">
  <div class="m-auto p-6 w-96">
    <h1 class="text-6xl font-bold pb-4">gaycat.online</h1>
    <h3 class="text-2xl pb-5">v2 coming soon™️</h3>
    {#if data.isAuthenticated}
      <a href="/dash">Dashboard</a>
    {:else}
      <a href="/api/auth/login">Sign in</a>
      <a href="/api/auth/register">Sign up</a>
    {/if}
  </div>
</div>
