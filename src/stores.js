import { merge } from "ramda";
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
    update: (todoId, text) => update((xs) => merge(xs, { [todoId]: { text } })),
    delete: (todoId) => update((xs) => dropKey(todoId, xs)),
    reset: () => set({}),
  };
}

export const todos = CreateTodos();
