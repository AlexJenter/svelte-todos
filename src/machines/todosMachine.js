import { Machine, assign } from "xstate";
import { useMachine } from "./useMachine";
import { v4 as uuid } from "uuid";

const createTodo = (todo) => ({
  id: uuid(),
  completed: false,
  ...todo,
});

export const TodosMachine = Machine({
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
    TODO_TOGGLE_COMPLETED: {
      actions: ["toggleTodoCompleted", "persist"],
    },
    TODO_DELETE: {
      actions: ["deleteTodo", "persist"],
    },
    "NEWTODO.CHANGE": {
      actions: assign({
        todo: (context, event) => event.value,
      }),
    },
    "NEWTODO.COMMIT": {
      actions: [
        assign({
          todo: "",
          todos: (context, event) =>
            context.todos.concat(createTodo({ text: event.value.trim() })),
        }),
        "persist",
      ],
      cond: (context, event) => event.value.trim().length,
    },
    TODO_CHANGE: {
      actions: ["updateTodo", "persist"],
    },
    SHOW_ALL: { target: "all" },
    SHOW_ACTIVE: { target: "active" },
    SHOW_COMPLETED: { target: "completed" },
    SEED: {
      actions: ["seed", "persist"],
    },
    DROP: {
      actions: "dropAll",
    },
  },
});

export const useTodosMachine = useMachine(
  TodosMachine.withConfig(
    {
      actions: {
        persist: (context) => {
          localStorage.setItem("todos-xstate", JSON.stringify(context.todos));
        },
        deleteTodo: assign({
          todos: ({ todos: ts }, { id }) => ts.filter((t) => t.id !== id),
        }),
        toggleTodoCompleted: assign({
          todos: ({ todos: ts }, { id }) =>
            ts.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            ),
        }),
        updateTodo: assign({
          todos: ({ todos: ts }, { id, text }) =>
            ts.map((t) => (t.id === id ? { ...t, text } : t)),
        }),
        dropAll: (context) => {
          localStorage.setItem("todos-xstate", "");
          assign({
            todos: [],
          });
        },
        seed: assign({
          todos: [
            createTodo({ text: "buy sum soy bois", completed: true }),
            createTodo({ text: "learn svelte" }),
            createTodo({ text: "learn knitting", completed: true }),
            createTodo({ text: "learn the shuffle" }),
          ],
        }),
      },
    },
    {
      todo: "",
      todos: (() => {
        try {
          return JSON.parse(localStorage.getItem("todos-xstate")) || [];
        } catch (error) {
          return [];
        }
      })(),
    }
  )
);
