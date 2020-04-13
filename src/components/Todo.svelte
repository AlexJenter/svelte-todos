<script>
    export let todo;
    $: completed = todo.completed
</script>

<li
    class="Todo"
    class:completed
>
    <input
        type="checkbox"
        checked={completed}
        class="Checkbox"
    >
    <span class="Text">{todo.text}</span>
    <button class="Delete">&times;</button>
</li>

<style lang="scss">
    .Todo {
        display: flex;
        align-items: baseline;

        &.completed > .Text {
            text-decoration: line-through;
        }
    }

    .Text {
        display: inline-block;
        flex-grow: 1;
    }

    .Checkbox {
        display: block;
        margin-right: 10px;
    }

    .Delete {
        margin-left: 10px;
        display: block;
        border: none;
        background: none;
    }
</style>