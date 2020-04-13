<script>
    export let todo;
</script>

<li>
    <input type="checkbox" checked={todo.completed} class="done">
    <span>{todo.text}</span>
    <button class="delete">&times;</button>
</li>

<style>
    li {
        display: flex;
        align-items: baseline;
    }
    span {
        display: inline-block;
        flex-grow: 1;
    }
    .done {
        display: block;
        margin-right: 10px;
    }
    .delete {
        margin-left: 10px;
        display: block;
        border: none;
        background: none;
    }
</style>