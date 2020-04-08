<script>
    import ListItem from './list-item.svelte'
    import { todos, cursor } from '../stores.js'
</script>

<ul>
    {#each Object.entries($todos) as [uuid, { text }], i (uuid)}
        <ListItem selected={$cursor === i} {uuid} {text} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>