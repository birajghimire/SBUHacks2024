import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const initialState = {
    text: "",
  };
  
  export const notebookEditorSlice = createAppSlice({
    name: "notebook-editor",
    initialState,
    reducers: create => ({
      update: create.reducer((state, action) => {
        state.text = action.payload
      }),
      reset: create.reducer(state => {
        state.text = ""
      })
    }),
    selectors: {
      selectText: slice => slice.text
    }
  })
  
  export const { update, reset } = notebookEditorSlice.actions
  
  export const { selectText } = notebookEditorSlice.selectors