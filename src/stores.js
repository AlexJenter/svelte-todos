import {
  __,
  append,
  clamp,
  compose,
  dec,
  inc,
  map,
  merge,
  propEq,
  reject,
} from "ramda";

import { writable, derived } from "svelte/store";
import { v1 as uuid } from "uuid";

function CreateTodos() {
  const withDefaults = (todo) => ({
    uuid: uuid(),
    done: false,
    edit: false,
    cursorDelta: undefined,
    text: "",
    ...todo,
  });

  const { subscribe, set, update } = writable(
    [
      { done: true, text: "buy milk" },
      { done: false, text: "learn svelte" },
    ].map(withDefaults)
  );

  return {
    subscribe,
    add: (text) => update(append(withDefaults({ text }))),
    delete: (uuid) => update(reject(propEq("uuid", uuid))),
    toggleDone: (uuid) =>
      update(map((t) => (t.uuid === uuid ? { ...t, done: !t.done } : t))),
    reset: () => set([]),
  };
}
export const todos = CreateTodos();

function CreateCursor() {
  const { subscribe, set, update } = writable(-1);
  let boundedInc;
  let boundedDec;

  todos.subscribe((ts) => {
    boundedInc = compose(clamp(0, ts.length - 1), inc);
    boundedDec = compose(clamp(0, ts.length - 1), dec);
  });

  return {
    subscribe,
    reset: () => set(-1),
    prev: () => update(boundedDec),
    next: () => update(boundedInc),
    setLen: () => {
      console.log(OHAI);
    },
  };
}
export const cursor = CreateCursor();

export const cursedTodos = derived([todos, cursor], ([$todos, $cursor]) => {
  return $todos.map((todo, i) => merge(todo, { cursorDelta: $cursor - i }));
});
