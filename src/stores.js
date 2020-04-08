import { __, clamp, compose, merge, over, dec, inc, lensProp } from "ramda";
import { writable } from "svelte/store";
import { v1 as uuid } from "uuid";

import { dropKey } from "./helpers.js";

function CreateTodos() {
  const { subscribe, set, update } = writable({
    [uuid()]: { text: "buy milk" },
    [uuid()]: { text: "learn svelte" },
  });

  return {
    subscribe,
    add: (text) => update((xs) => ({ ...xs, [uuid()]: { text } })),
    update: (todoId, text) => update(merge(__, { [todoId]: { text } })),
    delete: (todoId) => update((xs) => dropKey(todoId, xs)),
    reset: () => set({}),
  };
}

export const todos = CreateTodos();

function CreateCursor(len) {
  const { subscribe, set, update } = writable(-1);
  let max;

  todos.subscribe(($todos) => {
    max = Object.keys($todos).length - 1;
  });

  const boundedInc = compose(clamp(0, max), inc);
  const boundedDec = compose(clamp(0, max), dec);

  return {
    subscribe,
    prev: () => update(boundedDec),
    next: () => update(boundedInc),
    reset: () => set(-1),
  };
}

export const cursor = CreateCursor(2);
