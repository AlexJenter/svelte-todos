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

<section>
    <button
        type="button"
        on:click={() => send('SHOW_ALL')}
        class:active={$state.matches('all')}
    >All</button>
    <button
        type="button"
        on:click={() => send('SHOW_ACTIVE')}
        class:active={$state.matches('active')}
    >Active</button>
    <button
        type="button"
        on:click={() => send('SHOW_COMPLETED')}
        class:active={$state.matches('completed')}
    >Done</button>
</section>


<!-- <pre>{JSON.stringify($state.value, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify($state.context, null, 2)}</pre> -->

<style lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        padding: 0;
    }
    button.active {
        background-color: lightsalmon
    }
</style>