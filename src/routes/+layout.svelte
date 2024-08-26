<script>
  import "../app.pcss";
  import { onMount } from "svelte";
  import "@fontsource-variable/dm-sans";

  onMount(() => {
    const analyticsScript = document.createElement("script");
    analyticsScript.defer = true;
    analyticsScript.dataset.domain = "gaycat.online";
    analyticsScript.src = "https://a.arti.lol/js/script.js";
    document.head.appendChild(analyticsScript);
  });
</script>

<svelte:head>
  <title>gaycat redirects</title>
</svelte:head>

<slot />
