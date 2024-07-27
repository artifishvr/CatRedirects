<script>
  export let domain;

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Select from "$lib/components/ui/select";
  import * as Table from "$lib/components/ui/table";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import Trash2 from "lucide-svelte/icons/trash-2";
  import ExternalLink from "lucide-svelte/icons/external-link";
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import UserPen from "lucide-svelte/icons/user-pen";
  import RefreshCw from "lucide-svelte/icons/refresh-cw";

  import { toast } from "svelte-sonner";
  import { invalidateAll } from "$app/navigation";

  let linkDialogOpen = false;
  let linkPlatform = "";
  let linkContent = "";
  let edited = false;
  let domainUrl = domain.url;

  $: {
    if (domainUrl != domain.url) {
      edited = true;
    } else {
      edited = false;
    }
  }
</script>

<Table.Row>
  <Table.Cell class="font-medium">
    <a href="https://{domain.host}" target="_blank">
      <div class="flex gap-1 items-center">
        {domain.host.replace(".gaycat.online", "")}
        <ExternalLink size={16} />
      </div>
    </a>
  </Table.Cell>
  <Table.Cell>
    <Input
      type="text"
      placeholder="URL"
      class="max-w-xs"
      bind:value={domainUrl} />
  </Table.Cell>
  <Table.Cell class="text-right">
    {#if edited}
      <Button
        variant="default"
        class="w-16"
        on:click={async () => {
          toast.info("Updating...");

          const response = await fetch("/api/redirects/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              host: domain.host,
              url: domainUrl,
            }),
          });

          if (!response.ok) {
            toast.error(`${await response.text()}`);
          } else {
            toast.success("Successfully Updated!");
            edited = false;
            invalidateAll();
          }
        }}>
        <RefreshCw size={24} class="w-full" /></Button>
    {:else}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          class={buttonVariants({ variant: "secondary" }) + " w-16"}>
          <Ellipsis size={24} class="w-full" /></DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Options</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item on:click={() => (linkDialogOpen = true)}
              ><UserPen class="mr-2 h-4 w-4" /><span>Link Account</span
              ></DropdownMenu.Item>
            <DropdownMenu.Item
              on:click={async () => {
                toast.info("Deleting...");

                const response = await fetch("/api/redirects/delete", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: domain.id,
                  }),
                });

                if (!response.ok) {
                  toast.error(`${await response.text()}`);
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
    {/if}
  </Table.Cell>
</Table.Row>

<!-- Link Account Dialog -->
<Dialog.Root bind:open={linkDialogOpen}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Link a Social Media Account</Dialog.Title>
      <Dialog.Description>
        Experimental! May be removed at any time.<br /> Video Tutorials for
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
              toast.error(`${await response.text()}`);
            } else {
              toast.success("Ready to link!");

              linkPlatform = "";
              linkContent = "";
            }
          }}>Link</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
