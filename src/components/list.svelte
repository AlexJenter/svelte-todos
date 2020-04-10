<script>
    import ListItem from './list-item.svelte'
    import { cursedTodos } from '../stores.js'
</script>

<ul>
    {#each $cursedTodos as todo (todo.uuid)}
        <ListItem {todo} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>