import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";

function saveState(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadState() {
  try {
    const serializedState = localStorage.getItem("state");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    posts: postsReducer,
  },
});

store.subscribe(() => saveState(store.getState()));

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
