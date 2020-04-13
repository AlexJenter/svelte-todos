import { createMachine, assign } from "xstate";
import { useMachine } from "svelte-xstate";
import { v4 as uuid } from "uuid";

const createTodo = (text) => ({
  id: uuid(),
  done: false,
  text,
});

export const TodosMachine = createMachine({
  id: "todos",
  initial: "all",
  context: {
    todo: "",
    todos: [],
  },
  states: {
    all: {},
    active: {},
    completed: {},
  },
  on: {
    "NEWTODO.CHANGE": {
      actions: assign({
        todo: (context, event) => event.value,
      }),
    },
    "NEWTODO.COMMIT": {
      actions: assign({
        todo: "",
        todos: (context, event) =>
          context.todos.concat(createTodo(event.value.trim())),
      }),
      cond: (context, event) => event.value.trim().length,
    },
  },
});

let [state, send] = useMachine(
  TodosMachine.withConfig(
    {},
    {
      todo: "",
      todos: [
        createTodo("buy soy boi milk"),
        createTodo("learn svelte"),
        createTodo("learn state management"),
      ],
    }
  )
);

export const useTodosMachine = () => ({
  state,
  send,
});
