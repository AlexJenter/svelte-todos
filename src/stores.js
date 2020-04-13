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
  cond,
  equals,
  T,
  findIndex,
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
      { done: true, text: "buy vegan milk" },
      { done: false, text: "learn svelte" },
    ].map(withDefaults)
  );

  return {
    subscribe,
    add: (text) => update(append(withDefaults({ text }))),
    delete: (uuid) => update(reject(propEq("uuid", uuid))),
    update: (fn) => update(fn),
    reset: () => set([]),
    toggleDone: (uuid) =>
      update((ts) => {
        const todoIndex = findIndex(propEq("uuid", uuid), ts);
        const doneProp = compose(lensIndex(todoIndex), lensProp`done`);
        return over(doneProp, not, ts);
      }),
    toggleEdit: (uuid) =>
      update((ts) => {
        const todoIndex = findIndex(propEq("uuid", uuid), ts);
        const doneProp = compose(lensIndex(todoIndex), lensProp`edit`);
        return over(doneProp, not, ts);
      }),
  };
}
export const todos = CreateTodos();

function CreateCursor() {
  const { subscribe, set, update } = writable(-1);
  let boundedInc;
  let boundedDec;

  const safeUpdate = (fn) =>
    update((c) => {
      if (c !== -1) fn(c);
      return c;
    });

  todos.subscribe((todos) => {
    boundedInc = compose(clamp(0, todos.length - 1), inc);
    boundedDec = compose(clamp(0, todos.length - 1), dec);
  });

  return {
    subscribe,
    reset: () => set(-1),
    set: (x) => set(x),
    prev: () => update(boundedDec),
    next: () => update(boundedInc),
    delete: () =>
      safeUpdate((c) => {
        todos.update(remove(c, 1));
      }),
    toggleDone: () =>
      safeUpdate((c) => {
        const doneProp = compose(lensIndex(c), lensProp`done`);
        todos.update(over(doneProp, not));
      }),
    toggleEdit: () =>
      safeUpdate((c) => {
        const editProp = compose(lensIndex(c), lensProp`edit`);
        todos.update(over(editProp, not));
      }),
  };
}
export const cursor = CreateCursor();

function CreateForm() {
  const { subscribe, set, update } = writable("");

  return {
    subscribe,
    update,
    set: (x) => set(x),
    reset: () => set(""),
  };
}
export const form = CreateForm();

export const cursedTodos = derived([todos, cursor], ([$todos, $cursor]) => {
  return $todos.map((todo, i) => merge(todo, { cursorDelta: $cursor - i }));
});
