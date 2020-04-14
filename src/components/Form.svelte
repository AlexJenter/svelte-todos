<script>
    import { useTodosMachine } from "../machines/todosMachine";
	const { state, send } = useTodosMachine();
	
	const onKepress = event => {
		if(event.key === 'Enter') {
			send({type: 'NEWTODO.COMMIT', value: event.target.value })
		}
	};
	const onInput = event=> {
		send({type: 'NEWTODO.CHANGE', value: event.target.value})
	};
</script>


<form>
	<input
		on:keypress={onKepress}
		on:input={onInput}
		value={$state.context.todo}
	>
	<button
		type="button"
		on:click={() => send('SEED')}
	>seed</button>
</form>