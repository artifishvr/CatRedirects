<script>
    export let data;
</script>

{#each data.cats as cat}
    <p>{cat.name}</p>
{/each}
