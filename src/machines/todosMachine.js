import { createMachine, assign } from "xstate";
import { useMachine } from "svelte-xstate";
import { v4 as uuid } from "uuid";

const createTodo = (todo) => ({
  id: uuid(),
  completed: false,
  ...todo,
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
        createTodo({ text: "buy soy boi milk", completed: true }),
        createTodo({ text: "learn svelte" }),
        createTodo({ text: "learn state management" }),
      ],
    }
  )
);

export const useTodosMachine = () => ({
  state,
  send,
});
