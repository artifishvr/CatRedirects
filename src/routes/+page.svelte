<script>
  export let data;
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div
  class="bg-zinc-950 text-white flex flex-col justify-center items-center min-h-screen text-center">
  <h1 class="text-6xl font-bold pb-4">gaycat.online</h1>
  <h3 class="text-2xl pb-5">subdomains for gay cats</h3>
  {#if data.isAuthenticated}
    <Button href="/dash">Dashboard</Button>
  {:else}
    <div>
      <Button href="/auth" class="mx-2">Login/Signup</Button>
      <Button href="/demo" class="mx-2" variant="secondary">Demo</Button>
    </div>
  {/if}

  <div class="text-sm text-gray-300 pt-8">
    <h6>
      Anyone can register a domain, but they may not be used to attack protected
      groups or host illegal content.
    </h6>
    <h6>
      Only supports redirects (and linking them to discord or bluesky). More
      options coming soon&trade;
    </h6>
  </div>

  <!-- <p class="absolute bottom-0 text-zinc-400 text-sm mb-8">
    with ❤️ by <a
      href="https://arti.gay"
      target="_blank"
      class="text-blue-300 underline">arti</a>
  </p> -->
</div>
