<script>
    import { match } from "../helpers";
    import { todos, cursor } from '../stores.js'
    import DebugInfo from "./debug-info.svelte";
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();


    export let todo;
    $: selected = todo.cursorDelta === 0
    $: done = todo.done

    const toggleDone = () => todos.toggleDone(todo.uuid);
    const toggleEdit = () => todos.toggleEdit(todo.uuid);
</script>


<li class:selected>
    <input type="checkbox" checked={done} class="checkbox"/>
    <label>
        {#if todo.edit}
            <span class:done>
                <input bind:value={todo.text}>
            </span>
        {:else}
            <span class:done>
                {todo.text}
            </span>
        {/if}
    </label>
    <button
        on:click={todos.delete(todo.uuid) }
        class="delete">&times;</button>
</li>

<style>
    li {
        display: flex;
        align-items: baseline;
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

    .checkbox {
        display: block;
        margin-right: 10px;
    }
    .delete {
        display: block;
        border: none;
        background: none;
        opacity: 0;
        transition: opacity 300ms ease-in-out;
    }
    li:hover .delete {
        opacity: 1;
    }
</style>
