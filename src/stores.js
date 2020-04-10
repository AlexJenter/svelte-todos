import {
  __,
  append,
  clamp,
  compose,
  dec,
  inc,
  lensIndex,
  lensProp,
  map,
  merge,
  not,
  over,
  propEq,
  reject,
  identity,
  view,
  tap,
  remove,
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
    update: (fn) => update(fn),
    reset: () => set([]),
  };
}
export const todos = CreateTodos();

function CreateCursor() {
  const { subscribe, set, update } = writable(-1);
  let boundedInc;
  let boundedDec;

  todos.subscribe((todos) => {
    boundedInc = compose(clamp(0, todos.length - 1), inc);
    boundedDec = compose(clamp(0, todos.length - 1), dec);
  });

  const safeUpdate = (fn) =>
    update((c) => {
      if (c === -1) return c;
      fn(c);
      return c;
    });

  return {
    subscribe,
    reset: () => set(-1),
    prev: () => update(boundedDec),
    next: () => update(boundedInc),
    delete: () =>
      update((c) => {
        if (c === -1) return c;
        todos.update(remove(c, 1));
        return c;
      }),
    toggleDone: () =>
      update((c) => {
        if (c === -1) return c;
        todos.update(over(compose(lensIndex(c), lensProp`done`), not));
        return c;
      }),
  };
}
export const cursor = CreateCursor();

export const cursedTodos = derived([todos, cursor], ([$todos, $cursor]) => {
  return $todos.map((todo, i) => merge(todo, { cursorDelta: $cursor - i }));
});
