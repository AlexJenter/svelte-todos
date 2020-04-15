<script>
import { useTodosMachine } from "../machines/todosMachine";
const { state, send } = useTodosMachine;

export let text;
export let dispatches;
export let match;
</script>

<button
    type="button"
    on:click={() => send(dispatches)}
    class:active={$state.matches(match)}
>
    {text}
</button>


<style lang="scss">
    button.active {
        background-color: lightsalmon
    }
</style>