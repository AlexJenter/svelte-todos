<script>
	import { UiService } from "./stateMachines";
	import { keysToState } from './inputDirectives.js'
	import Form from './components/Form.svelte'
	import List from './components/list.svelte'
</script>

<svelte:window use:keysToState />

<main>
	<Form />
	<List />
</main>

<style>
:global(body) {
	font-family: Victor Mono;
}
main {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>