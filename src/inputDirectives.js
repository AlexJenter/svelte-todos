import { match } from "./helpers.js";
import { todos, cursor } from "./stores.js";

export const focusOnSelect = (node) => {
  node && typeof node.focus === "function" && node.focus();
  node && typeof node.select === "function" && node.select();
};

export const saveOnKeyEnter = (node, uuid) => {
  const handle = (event) => {
    match(event.code, {
      Enter() {
        todos.update(uuid, node.value);
      },
      ArrowUp() {
        todos.update(uuid, node.value);
      },
      ArrowDown() {
        todos.update(uuid, node.value);
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

export const keysToState = (node) => {
  const handle = (event) => {
    match(event.code, {
      ArrowUp() {
        cursor.prev();
      },
      ArrowDown() {
        cursor.next();
      },
      Escape() {
        cursor.reset();
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
