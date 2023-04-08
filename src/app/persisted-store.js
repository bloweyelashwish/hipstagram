import { STORAGE_PREFIX } from "../globals";

export const loadPersistedState = () => {
  try {
    const state = localStorage.getItem(STORAGE_PREFIX);
    if (!state) {
      return undefined;
    }

    return JSON.parse(state);
  } catch (e) {
    console.error(e);
  }
};

export function persistState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_PREFIX, serializedState);
  } catch (e) {
    console.error(e);
  }
}
