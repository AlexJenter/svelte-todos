import { createMachine, assign } from "xstate";

export const todoMachine = createMachine({
  id: "todo",
  initial: "reading",
  context: {
    id: undefined,
    text: "",
    prevText: "",
  },
  on: {
    TEST: {
      actions: () => {
        console.log("OHAI");
      },
    },
    TOGGLE_COMPLETE: {
      actions: [assign({ completed: true }), "notifyChange"],
    },
  },
  states: {
    reading: {},
  },
});
