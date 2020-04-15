<script>
    import { useTodosMachine } from "../machines/todosMachine";
    import { match } from "../helpers.js";
    import Todo from "./Todo.svelte";

    const { state, send } = useTodosMachine;
  
    const filterTodos = ({value}, todos) => match(value, {
        all: () => todos,
        active: () => todos.filter(({completed}) => !completed),
        completed: () => todos.filter(({completed}) => completed)
    });

    $: filteredTodos = filterTodos($state, $state.context.todos);
</script>

<ul>
    {#each filteredTodos as todo (todo.id)}
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