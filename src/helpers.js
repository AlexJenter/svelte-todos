import { identity } from "ramda";

export const dropKey = (key, obj) => {
  delete obj[key];
  return obj;
};

export const match = (key, obj) => (obj[key] || identity)();
