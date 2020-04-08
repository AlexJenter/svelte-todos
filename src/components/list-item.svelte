<script>
    import { todos,cursor } from '../stores.js'
    export let uuid = "";
    export let text = "";
    export let selected = false;
    let done = false;
</script>

<li class:selected>
    <label>
        <input type="checkbox" bind:checked={done}>
        <span class:done>
            {#if false}
                <input value={text}>
            {:else}
                {text}
            {/if}
        </span>
    </label>
    <button on:click={todos.delete(uuid)}>delete</button>
</li>

<style>
    li {
        display: flex;
        align-items: center;
    }
    li.selected {
        background: red;
    }
    span {
        display: inline-block;
        width: 300px;
    }
    span.done {
        text-decoration: line-through;
    }
</style>
