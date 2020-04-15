<script>
    export let todo;
    import { createEventDispatcher } from "svelte";
    import { useMachine } from "svelte-xstate";
    import { todoMachine } from "../machines/todoMachine";

    import { useTodosMachine } from "../machines/todosMachine";
    const { state: todosState, send: todosSend } = useTodosMachine();

    const [ state, send ] = useMachine(todoMachine.withConfig( {}, todo ));

    $: completed = todo.completed;
    $: text = todo.text;
    $: id = todo.id;
</script>

<li class="Todo">
    <input
        type="checkbox"
        bind:checked={completed}
        on:change={() => todosSend('TODO_TOGGLE_COMPLETED', {id})}
        class="Checkbox"
    >
    <label
        class="Text"
        class:completed
    >
        {text}
    </label>
    <button
        class="Delete"
        on:click={() => todosSend('TODO_DELETE', {id})}
    >
        &times;
    </button>
</li>

<style lang="scss">
    .Todo {
        display: flex;
        align-items: baseline;

    }

    .Text {
        display: inline-block;
        flex-grow: 1;
        margin: 0 10px;        

        &.completed {
            text-decoration: line-through;
        }
    }

    .Checkbox {}

    .Delete {
        border: none;
        background: none;
    }
</style>