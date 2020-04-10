import { __, clamp, compose, merge, dec, inc } from "ramda";
import { writable, derived } from "svelte/store";
import { v1 as uuid } from "uuid";

import { dropKey } from "./helpers.js";

function CreateTodos() {
  const { subscribe, set, update } = writable([
    { uuid: uuid(), done: true, text: "buy milk" },
    { uuid: uuid(), done: false, text: "learn svelte" },
  ]);

  const defaultProps = () => ({
    uuid: uuid(),
    done: false,
  });

  return {
    subscribe,
    add: (text) => update((todos) => [...todos, { ...defaultProps(), text }]),
    delete: (uuid) => update((todos) => todos.filter((t) => t.uuid !== uuid)),
  };
}

export const todos = CreateTodos();

function CreateCursor() {
  const { subscribe, set, update } = writable(-1);
  let boundedInc;
  let boundedDec;
  let currentValue;

  const updateTodoDeltas = (ts, cI) => {
    ts.map((t, tI) => (t.cursorDelta = cI - tI));
  };

  todos.subscribe((todos) => {
    update((x) => (currentValue = x));
    updateTodoDeltas(todos, currentValue);
    boundedInc = compose(clamp(0, todos.length - 1), inc);
    boundedDec = compose(clamp(0, todos.length - 1), dec);
  });

  return {
    subscribe,
    reset: () => set(-1),
    prev: () => update(boundedDec),
    next: () => update(boundedInc),
  };
}

export const cursor = CreateCursor();
