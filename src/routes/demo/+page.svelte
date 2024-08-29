<script>
  export let data;
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label";

  import DomainRow from "$lib/components/DemoDomainRow.svelte";
  import { version } from "$app/environment";
  let newRedirectDialog = false;
  let newRedirectUrl = "";
  let newRedirectHost = "";
</script>

<div class="bg-zinc-950 text-white py-24 flex text-center">
  <div class="m-auto p-6">
    <h1 class="text-4xl font-bold pb-1">Welcome to gaycat.online!</h1>
    <h2 class="text-xl font-medium">
      This is a demo version of the dashboard. <br /><a
        href="/auth"
        class="underline text-blue-300">Sign up for a free account</a> to get full
      access.
    </h2>

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

    <div class="pt-2">
      <Button variant="default" on:click={() => (newRedirectDialog = true)}
        >New Redirect</Button>
      <Button variant="secondary" href="/">Sign Out</Button>
    </div>

    <p class="pt-8 text-zinc-400 text-sm">
      need help? reach out via
      <a href="mailto:support@gaycat.online" class="text-blue-300 underline"
        >support@gaycat.online</a>
      <br />

      v{version} (demo is running v2.6.0)
      <br />with &lt;3 by
      <a
        href="https://arti.gay/?ref=gaycatdemobackend"
        class="text-blue-300 underline">arti</a>
    </p>

    <!-- Create Redirect Dialog -->
    <Dialog.Root bind:open={newRedirectDialog}>
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Create Redirect</Dialog.Title>
          <Dialog.Description>
            Make a new redirect! Click "create" when you're done.<br /><span
              class="text-xs">Disabled in demo mode.</span>
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
          <Button type="submit" disabled>Create</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>

<Toaster />
