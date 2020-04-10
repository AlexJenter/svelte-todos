<script>
    import ListItem from './list-item.svelte'
    import { todos, cursor } from '../stores.js'
</script>

<ul>
    {$cursor}
    {#each $todos as todo, i (todo.uuid)}
        <ListItem {todo} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>