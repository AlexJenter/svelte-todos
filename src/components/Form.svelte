<script>
    import { useTodosMachine } from "../machines/todosMachine";
    const { state, send } = useTodosMachine();
</script>


<input
	on:keypress={event => {
		if(event.key === 'Enter') {
			send({type: 'NEWTODO.COMMIT', value: event.target.value })
		}
	}}
	on:input={event=> {
		send({type: 'NEWTODO.CHANGE', value: event.target.value})
	}}
	value={$state.context.todo}
>