<script>
  export let data;
  import { toast } from "svelte-sonner";
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label";

  import DomainRow from "$lib/components/DomainRow.svelte";
  import { invalidateAll } from "$app/navigation";
  import { version } from "$app/environment";
  let newRedirectDialog = false;
  let newRedirectUrl = "";
  let newRedirectHost = "";
</script>

<div class="bg-zinc-950 text-white py-24 flex text-center">
  <div class="m-auto p-6">
    <h1 class="text-3xl font-bold pb-1">
      Hi{data.userInfo.given_name ? " " + data.userInfo.given_name : ""}!
    </h1>
    <h2 class="text-xl font-medium">Here's all your gaycat redirects.</h2>

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Host</Table.Head>
          <Table.Head>Url</Table.Head>
          <Table.Head class="text-right">Options</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each data.result as domain}
          <DomainRow {domain} />
        {/each}
      </Table.Body>
    </Table.Root>

    {#if data.result.length == 0}
      <div class="flex gap-1 items-center">
        <span class="text-zinc-400 text-center py-3 w-full text-lg"
          >No redirects found.<br />Legacy redirects can be added by contacting
          us via
          <a href="mailto:support@gaycat.online" class="text-blue-300 underline"
            >email</a
          >.
        </span>
      </div>
    {/if}

    <div class="pt-2">
      <Button variant="default" on:click={() => (newRedirectDialog = true)}>
        New Redirect</Button>
      <Button variant="secondary" href="/api/auth/logout">Sign Out</Button>
    </div>

    <p class="pt-8 text-zinc-400 text-sm">
      {#if data.result.length !== 0}
        need help? reach out via
        <a href="mailto:support@gaycat.online" class="text-blue-300 underline"
          >support@gaycat.online</a>
        or
        <a
          href="https://github.com/artifishvr/catredirects/issues"
          target="_blank"
          class="text-blue-300 underline">GitHub</a>
        <br />
      {/if}

      v{version}
      <br />with &lt;3 by
      <a
        href="https://arti.gay/?ref=gaycatbackend"
        class="text-blue-300 underline">arti</a>
    </p>

    <!-- Create Redirect Dialog -->
    <Dialog.Root bind:open={newRedirectDialog}>
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Create Redirect</Dialog.Title>
          <Dialog.Description>
            Make a new redirect! Click "create" when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="host" class="text-right">Host</Label>
            <Input
              id="host"
              placeholder="rick"
              class="col-span-3"
              bind:value={newRedirectHost} />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="url" class="text-right">URL</Label>
            <Input
              id="url"
              placeholder="https://youtu.be/dQw4w9WgXcQ"
              class="col-span-3"
              bind:value={newRedirectUrl} />
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close>
            <Button
              type="submit"
              on:click={async () => {
                toast.info("Creating...");

                if (newRedirectHost == "" || newRedirectUrl == "")
                  return toast.error("All fields must be filled in!");

                const response = await fetch("/api/redirects/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    host: newRedirectHost,
                    url: newRedirectUrl,
                  }),
                });

                if (!response.ok) {
                  toast.error(`${await response.text()}`);
                } else {
                  toast.success("Successfully Updated!");

                  newRedirectHost = "";
                  newRedirectUrl = "";
                  invalidateAll();
                }
              }}>Create</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>

<Toaster />
