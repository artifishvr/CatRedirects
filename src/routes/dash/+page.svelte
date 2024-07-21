<script>
  export let data;

  console.log(data.result);
</script>

<div class="bg-zinc-900 text-white py-24 flex text-center">
  <div class="m-auto p-6">
    <h1 class="text-6xl font-bold pb-4">
      logged in as {data.userInfo.given_name}
    </h1>

    {#each data.result as domain}
      <div class="bg-gray-900">
        <input
          id="host-{domain.id}"
          type="text"
          class="text-black"
          value={domain.host.replace(".gaycat.online", "")} />
        <p>.gaycat.online</p>
        <input
          id="url-{domain.id}"
          type="text"
          class="text-black"
          value={domain.url} />
        <button
          on:click={async () => {
            let host = document.getElementById(`host-${domain.id}`).value;
            let url = document.getElementById(`url-${domain.id}`).value;

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
              console.error("Update failed:", response.statusText);
            }
            console.log(response);
          }}>update</button>
      </div>
    {/each}
  </div>
</div>
