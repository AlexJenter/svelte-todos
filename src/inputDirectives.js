import { match } from "./helpers.js";
import { UiService } from "./stateMachines";

export const focusOnSelect = (node) => {
  node && typeof node.focus === "function" && node.focus();
  node && typeof node.select === "function" && node.select();
};

export const saveOnKeyEnter = (node, uuid) => {
  const handle = (event) => {
    match(event.code, {
      Enter() {},
      ArrowUp() {},
      ArrowDown() {},
    });
  };

  node.addEventListener("keydown", handle);

  return {
    destroy() {
      node.removeEventListener("keydown", handle);
    },
  };
};

export const keysToState = (node) => {
  const handle = (event) => {
    match(event.code, {
      ArrowUp() {},
      ArrowDown() {
        UiService.send("FOCUS_LIST");
      },
      KeyD() {},
      KeyE() {},
      Backspace() {},
      Tab() {
        UiService.send("FOCUS_FORM");
      },
      Enter() {
        const { value } = event.target;
        UiService.send({ type: "FORM_SUBMIT", value });
      },
    });
  };

  node.addEventListener("keydown", handle);

  return {
    destroy() {
      node.removeEventListener("keydown", handle);
    },
  };
};

export const formInputOnKeys = (node) => {
  const handle = (event) => {
    match(event.code, {
      Escape() {
        node.blur();
      },
    });
  };

  node.addEventListener("keydown", handle);
  return {
    destroy() {
      node.removeEventListener("keydown", handle);
    },
  };
};
