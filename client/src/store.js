import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { notebookEditorSlice } from "./notebookEditorSlice";
const rootReducer = combineSlices(notebookEditorSlice);

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()