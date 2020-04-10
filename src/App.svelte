<script>
	import { createEventDispatcher } from 'svelte'
	import { keysToState } from './inputDirectives.js'
	import List from './components/list.svelte'
	import { todos, cursor } from './stores'
	import { clamp } from "ramda";
	import { match } from './helpers.js'

	let todoText = ""
	let todoSelectedIndex = -1;

	const onAdd = () => {
		todos.add(todoText);
		todoText = "";
	};

</script>

<svelte:window use:keysToState />


<main>
	<form on:submit|preventDefault={onAdd}>
		<input type="text" bind:value={todoText}>
		<button type="submit">+</button>
		<button type="button" on:click={todos.reset}>reset</button>
	</form>

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