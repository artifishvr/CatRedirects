<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  export let connection_id: string;

  export let loading: boolean = false;
</script>

{#if !loading}
  <Button
    variant="outline"
    class="w-full"
    on:click={async () => {
      loading = true;
      fetch("/api/getloginurl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          connection_id: connection_id,
        }),
      })
        .then((res) => res.text())
        .then((redirecturl) => {
          window.location.href = redirecturl;
        });
    }}><slot /></Button>
{:else}
  <Button variant="outline" disabled class="w-full">
    <LoaderCircle class="h-4 w-4 animate-spin" />
  </Button>
{/if}
