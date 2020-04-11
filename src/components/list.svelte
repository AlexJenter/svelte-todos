<script>
    import ListItem from './list-item.svelte'
    import { todos, cursor, cursedTodos } from '../stores.js'

    const onToggleDone = (event) => {
        const {uuid} = event.detail
        todos.toggleDone(uuid)
    }
</script>

<ul>
    {#each $cursedTodos as todo, i (todo.uuid)}
        <ListItem {todo} on:toggledone={onToggleDone} />
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
    }
</style>