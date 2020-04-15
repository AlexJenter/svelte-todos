import { Machine, assign } from "xstate";
import { useMachine } from "./useMachine";
import { useTodosMachine } from "./todosMachine";
const { state: tsState, send: tsSend } = useTodosMachine;

const TodoMachine = Machine({
  id: "todo",
  initial: "reading",
  context: {
    id: undefined,
    text: "",
    prevText: "",
  },
  states: {
    reading: {
      on: {
        EDIT_START: {
          target: "writing",
          actions: "cachePrevText",
        },
        TOGGLE_COMPLETED: {
          actions: "toggleCompleted",
        },
        DELETE: {
          actions: "delete",
        },
      },
    },
    writing: {
      on: {
        INPUT: {
          actions: "updateText",
        },
        EDIT_END: {
          target: "reading",
          actions: "commitText",
        },
        EDIT_ABORT: {
          target: "reading",
          actions: "revertText",
        },
      },
    },
  },
});

export const useTodoMachine = (todo) => {
  return useMachine(
    TodoMachine.withConfig(
      {
        actions: {
          cachePrevText: assign({
            prevText: ({ text }) => text,
          }),
          updateText: assign({
            text: (_, { text }) => text,
          }),
          commitText: ({ id, text }) => {
            tsSend("TODO_CHANGE", { id, text });
            assign({ prevText: "" });
          },
          revertText: assign({
            text: ({ prevText }) => prevText,
          }),
          toggleCompleted: ({ id }) => tsSend("TODO_TOGGLE_COMPLETED", { id }),
          delete: ({ id }) => tsSend("TODO_DELETE", { id }),
        },
      },
      todo
    )
  );
};
