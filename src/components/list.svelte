<script>
    import ListItem from './list-item.svelte'
    import { todos } from '../stores.js'
    export let selectedIndex = -1;
</script>

<ul>
    {#each Object.entries($todos) as [uuid, { text }], i (uuid)}
        <ListItem selected={selectedIndex == i} {uuid} {text} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>