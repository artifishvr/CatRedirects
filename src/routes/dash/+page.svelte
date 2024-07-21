<script>
  export let data;
  import * as Table from "$lib/components/ui/table";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label/index.js";
  import { toast } from "svelte-sonner";
</script>

<div class="bg-zinc-900 text-white py-24 flex text-center">
  <div class="m-auto p-6">
    <h1 class="text-3xl font-bold pb-1">
      Hi {data.userInfo.given_name}!
    </h1>
    <h2 class="text-xl font-medium">Here's all your gaycat redirects.</h2>

    <h3 class="text-md font-medium pb-4">
      Missing some? Get arti to manually link legacy redirects to your account.
    </h3>

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
          <Table.Row>
            <Table.Cell class="font-medium">
              {domain.host.replace(".gaycat.online", "")}
            </Table.Cell>
            <Table.Cell
              ><Input
                id="url-{domain.id}"
                type="text"
                placeholder="URL"
                class="max-w-xs"
                value={domain.url} /></Table.Cell>
            <Table.Cell class="text-right"
              ><Button
                variant="secondary"
                on:click={async () => {
                  let host = document.getElementById(`host-${domain.id}`).value;
                  let url = document.getElementById(`url-${domain.id}`).value;

                  if (url == domain.url)
                    return toast.warning("Nothing to update!");

                  const response = await fetch("/api/update", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      host: host,
                      url: url,
                    }),
                  });

                  if (!response.ok) {
                    toast.error(`Failed to Update: ${response.statusText}`);
                  } else {
                    toast.success("Successfully Updated!");
                  }
                  console.log(response);
                }}>Update</Button
              ></Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "default" })}
        >New Redirect</Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">Name</Label>
            <Input id="name" value="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right">Username</Label>
            <Input id="username" value="@peduarte" class="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">Save changes</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

    <Button variant="secondary" href="/api/auth/logout">Sign Out</Button>
  </div>
</div>
<Toaster />
