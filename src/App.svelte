<script>
	import { createEventDispatcher } from 'svelte'
	import List from './components/list.svelte'
	import { todos } from './stores'
	import { clamp, identity } from "ramda";
	import { match } from './helpers.js'

	const dispatch = createEventDispatcher()

	let todoText = ""
	let todoSelectedIndex = -1;

	const onAdd = () => {
		todos.add(todoText);
		todoText = "";
	};

	function handleKeydown(event) {
		const clamped = clamp(0, Object.keys($todos).length - 1)

		match(event.code, {
			ArrowUp() {
				todoSelectedIndex = clamped(todoSelectedIndex - 1);
			},
			ArrowDown() {
				todoSelectedIndex = clamped(todoSelectedIndex + 1);
			},
			KeyE() {
				dispatch('edit', { index: todoSelectedIndex })
			},
			Escape() {
				todoSelectedIndex = -1;
			}
		})
		// console.log(event);
		
	}
</script>

<svelte:window on:keydown={handleKeydown}/>

<main>
	<form on:submit|preventDefault={onAdd}>
		<input type="text" bind:value={todoText}>
		<button type="submit">+</button>
		<button type="button" on:click={todos.reset}>reset</button>
	</form>

	<List selectedIndex={todoSelectedIndex} on:edit/>
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