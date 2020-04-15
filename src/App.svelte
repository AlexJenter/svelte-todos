<script>
	import { UiService } from "./stateMachines";
	import { keysToState } from './inputDirectives.js'
	import Form from './components/Form.svelte'
	import List from './components/list.svelte'
	import Todos from './components/Todos.svelte'
	import Filter from './components/Filter.svelte'
</script>

<svelte:window use:keysToState />

<main>
	<Form />
	<Todos />
	<Filter />
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