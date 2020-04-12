<script>
    import ListItem from './list-item.svelte'
    import { todos, cursor, cursedTodos } from '../stores.js'
</script>

<ul>
    {#each $cursedTodos as todo, i (todo.uuid)}
        <ListItem {todo} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>