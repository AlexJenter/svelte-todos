<script>
    import { useTodosMachine } from "../machines/todosMachine";
    const { state, send } = useTodosMachine();
    import Todo from "./Todo.svelte";
</script>

<ul>
    {#each $state.context.todos as todo }
        <Todo {todo}/>
    {/each}
</ul>

<style lang="scss">
ul {
    display: flex;
    flex-direction: column;
    padding: 0;
}
</style>