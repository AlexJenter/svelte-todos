import { createMachine, interpret } from "xstate";
import { form, todos } from "./stores";

const UiMachine = createMachine(
  {
    id: "ui",
    initial: "idle",
    states: {
      idle: {
        on: {
          FOCUS_FORM: { target: "form", cond: "currentlyIdle" },
          FOCUS_LIST: { target: "list", cond: "currentlyIdle" },
        },
      },
      form: {
        on: {
          EXIT: {
            target: "idle",
          },
          FORM_SUBMIT: {
            internal: true,
            cond: "validTodo",
            actions: ["submitTodo", "clearForm"],
          },
        },
      },
      list: {
        on: {
          EXIT: {
            target: "idle",
          },
        },
      },
    },
  },
  {
    // https://xstate.js.org/docs/guides/guards.html#guards-condition-functions
    guards: {
      currentlyIdle: (_, __, { state }) => state.value === "idle",
      validTodo: (_, { value }) => value.length,
    },
    // https://xstate.js.org/docs/guides/actions.html#actions
    actions: {
      submitTodo: (ctx, { value }) => todos.add(value),
      clearForm: () => form.reset(),
    },
  }
);

export const UiService = interpret(UiMachine)
  .onTransition((state) => {
    if (window.debug || false) {
      console.log(state);
    }
  })
  .start();
