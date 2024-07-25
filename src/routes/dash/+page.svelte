<script>
  export let data;
  import { toast } from "svelte-sonner";
  import Trash2 from "lucide-svelte/icons/trash-2";
  import ExternalLink from "lucide-svelte/icons/external-link";
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import UserPen from "lucide-svelte/icons/user-pen";
  import * as Table from "$lib/components/ui/table";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Label } from "$lib/components/ui/label";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Select from "$lib/components/ui/select";
  import { invalidateAll } from "$app/navigation";
  let linkDialogOpen = false;
  let linkPlatform = "";
  let linkContent = "";
</script>

<div class="bg-zinc-900 text-white py-24 flex text-center">
  <div class="m-auto p-6">
    <h1 class="text-3xl font-bold pb-1">
      Hi {data.userInfo.given_name}!
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
          <Table.Row>
            <Table.Cell class="font-medium">
              <a href="https://{domain.host}" target="_blank">
                <div class="flex gap-1 items-center">
                  {domain.host.replace(".gaycat.online", "")}
                  <ExternalLink size={16} />
                </div>
              </a>
            </Table.Cell>
            <Table.Cell
              ><Input
                id="url-{domain.id}"
                type="text"
                placeholder="URL"
                class="max-w-xs"
                value={domain.url} /></Table.Cell>
            <Table.Cell class="text-right">
              <div class="flex gap-2">
                <Button
                  variant="secondary"
                  on:click={async () => {
                    let url = document.getElementById(`url-${domain.id}`).value;

                    if (url == domain.url)
                      return toast.warning("Nothing to update!");

                    toast.info("Updating...");

                    const response = await fetch("/api/redirects/update", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        host: domain.host,
                        url: url,
                      }),
                    });

                    if (!response.ok) {
                      toast.error(`Failed to Update: ${response.statusText}`);
                    } else {
                      toast.success("Successfully Updated!");
                      invalidateAll();
                    }
                  }}>Update</Button>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger
                    class={buttonVariants({ variant: "default" })}
                    ><Ellipsis /></DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      <DropdownMenu.Label>Options</DropdownMenu.Label>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        on:click={() => (linkDialogOpen = true)}
                        ><UserPen class="mr-2 h-4 w-4" /><span
                          >Link Account</span
                        ></DropdownMenu.Item>
                      <DropdownMenu.Item
                        on:click={async () => {
                          toast.info("Deleting...");

                          const response = await fetch(
                            "/api/redirects/delete",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                id: domain.id,
                              }),
                            }
                          );

                          if (!response.ok) {
                            toast.error(
                              `${(await response.text()) || response.statusText}`
                            );
                          } else {
                            toast.success("Deleted");
                            invalidateAll();
                          }
                        }}
                        ><Trash2 class="mr-2 h-4 w-4" /><span>Delete</span
                        ></DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </Table.Cell>
          </Table.Row>

          <Dialog.Root bind:open={linkDialogOpen}>
            <Dialog.Content class="sm:max-w-[425px]">
              <Dialog.Header>
                <Dialog.Title>Link a Social Media Account</Dialog.Title>
                <Dialog.Description>
                  Experimental! May be removed at any time.<br /> Video
                  Tutorials for
                  <a
                    href="https://rizz.zip/Desktop_20240725_15585106_21-f07QRFNSpC3M.mp4"
                    target="_blank"
                    class="underline text-blue-300">Discord</a>
                  &
                  <a
                    href="https://rizz.zip/Desktop_20240725_16461607_22-HGeNSqLqqQLa.mp4"
                    target="_blank"
                    class="underline text-blue-300">Bluesky</a>
                </Dialog.Description>
              </Dialog.Header>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="linkPlatform" class="text-right">Platform</Label>
                  <Select.Root id="linkPlatform" bind:selected={linkPlatform}>
                    <Select.Trigger class="w-[180px]">
                      <Select.Value placeholder="Platform" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="discord">Discord</Select.Item>
                      <Select.Item value="atproto-did">Bluesky</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="linkContent" class="text-right">Content</Label>
                  <Input
                    id="linkContent"
                    bind:value={linkContent}
                    placeholder="dh=555230139d9019d34352c2d6af629d88960505b8"
                    class="col-span-3" />
                </div>
              </div>
              <Dialog.Footer>
                <Dialog.Close>
                  <Button
                    type="submit"
                    on:click={async () => {
                      toast.info("Linking...");

                      const response = await fetch("/api/redirects/link", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          content: linkContent,
                          platform: linkPlatform,
                          host: domain.host,
                        }),
                      });

                      if (!response.ok) {
                        toast.error(
                          `${(await response.text()) || response.statusText}`
                        );
                      } else {
                        toast.success("Ready to link!");
                      }
                    }}>Link</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        {/each}
      </Table.Body>
    </Table.Root>
    {#if data.result.length == 0}
      <div class="flex gap-1 items-center">
        <span class="text-gray-400 text-center"
          >No redirects found.<br />Missing a host? Get arti to manually link
          legacy redirects to your account.</span>
      </div>
    {/if}

    <br class="pb-3" />

    <Dialog.Root>
      <Dialog.Trigger class={buttonVariants({ variant: "default" })}
        >New Redirect</Dialog.Trigger>
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
            <Input id="host" placeholder="rick" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="url" class="text-right">URL</Label>
            <Input
              id="url"
              placeholder="https://youtu.be/dQw4w9WgXcQ"
              class="col-span-3" />
          </div>
        </div>
        <Dialog.Footer>
          <Dialog.Close>
            <Button
              type="submit"
              on:click={async () => {
                toast.info("Creating...");

                if (
                  document.getElementById(`host`).value == "" ||
                  document.getElementById(`url`).value == ""
                )
                  return toast.error("All fields must be filled in!");

                const response = await fetch("/api/redirects/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    host: document.getElementById(`host`).value,
                    url: document.getElementById(`url`).value,
                  }),
                });

                if (!response.ok) {
                  toast.error(
                    `${(await response.text()) || response.statusText}`
                  );
                } else {
                  toast.success("Successfully Updated!");

                  invalidateAll();
                }
              }}>Create</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

    <Button variant="secondary" href="/api/auth/logout">Sign Out</Button>
  </div>
</div>

<Toaster />
