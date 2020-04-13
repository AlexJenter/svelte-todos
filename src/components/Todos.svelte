<script>
    import { useTodosMachine } from "../machines/todosMachine";
    const { state, send } = useTodosMachine();

    import Todo from "./Todo.svelte";
    $: todos = $state.context.todos
</script>

<ul>
    {#each todos as todo }
        <Todo {todo}/>
    {/each}
</ul>
<pre>{JSON.stringify(todos, null, 2)}</pre>

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        padding: 0;
    }
</style>