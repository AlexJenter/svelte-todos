<script>
    export let todo;

    import { useTodoMachine } from "../machines/todoMachine";
    const { state, send } = useTodoMachine(todo);

    $: isEditing = $state.value === 'writing'
    $: completed = todo.completed;
    $: text = $state.context.text;

    const handleInput = event => {
        const { target: { value }} = event       
        send('INPUT', { text: value })
    };
</script>

<li class="Todo">
    <input
        type="checkbox"
        bind:checked={completed}
        on:change={() => send('TOGGLE_COMPLETED')}
        class="Checkbox"
    >
    {#if isEditing}
        <button on:click={() => send('EDIT_END')}>save</button>
        <button on:click={() => send('EDIT_ABORT')}>esc</button>
        <input
            type="text"
            on:input={handleInput}
            value={text}>
    {:else}
        <label
            class="Text"
            class:completed
            on:dblclick={() => send('EDIT_START')}>
            {text}
        </label>
    {/if}
    <button
        class="Delete"
        on:click={() => send('DELETE')}
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