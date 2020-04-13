<script>
	import { UiService } from "../stateMachines";
    import { form as formStore, todos, cursor } from '../stores'
    import { formInputOnKeys } from "../inputDirectives";

    const onSubmit = () => {
		UiService.send({
			type: 'FORM_SUBMIT',
			value: $formStore
		})
	};	

	const onClick = () => {
		UiService.send('FOCUS_FORM')
	};
</script>

<form
    on:submit|preventDefault={onSubmit}
    on:click={onClick}
>
    <input
		use:formInputOnKeys
		type="text"
		bind:value={$formStore}
	>
    <button type="submit">+</button>
    <button type="button" on:click={todos.reset}>reset</button>
</form>