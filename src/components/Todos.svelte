<script>
    import { useTodosMachine } from "../machines/todosMachine";
    import { match } from "../helpers.js";
    const { state, send } = useTodosMachine();

    import Todo from "./Todo.svelte";


    const filterTodos = ({value}, todos) => match(value, {
        all: () => todos,
        active: () => todos.filter(({completed}) => !completed),
        completed: () => todos.filter(({completed}) => completed)
    });

    $: filteredTodos = filterTodos($state, $state.context.todos);
</script>

<ul>
    {#each filteredTodos as todo }
        <Todo {todo}/>
    {/each}
</ul>

<!-- <pre>{JSON.stringify($state.value, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify($state.context, null, 2)}</pre> -->

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        padding: 0;
    }
</style>