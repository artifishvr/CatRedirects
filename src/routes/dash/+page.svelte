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
      <p>{domain.host}</p>
      <p>{domain.url}</p>
    {/each}
  </div>
</div>
