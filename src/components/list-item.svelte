<script>
    import { match } from "../helpers";
    import { todos, cursor } from '../stores.js'
    import { todoOnKey } from "../inputDirectives.js";

    import DebugInfo from "./debug-info.svelte";

    export let todo;
    $: selected = todo.cursorDelta === 0
    $: checked = todo.done

    const toggleDone = () => {
        todos.toggleDone(todo.uuid)
    };

</script>

<li class:selected>
    <input type="checkbox" {checked} on:change={toggleDone} />
    <label>
        <span >
            {#if todo.edit}
                <input bind:value={todo.text} use:todoOnKey={todo}>
            {:else}
                {todo.text}
            {/if}
        </span>
    </label>
    <button on:click={todos.delete(todo.uuid)}>&times;</button>
</li>

<style>
    li {
        display: flex;
        align-items: center;
    }
    input, button {
        display: block;
    }
    li.selected {
        background: palegoldenrod;
    }
    span {
        display: inline-block;
        width: 500px;
    }
    span.done {
        text-decoration: line-through;
    }
</style>
