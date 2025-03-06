import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  memes: [],
  likes: {},  
  comments: {},  
  loading: false,
  error: null,
};

const memeSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    likeMeme: (state, action) => {
      const memeId = action.payload;
      state.likes[memeId] = (state.likes[memeId] || 0) + 1;
    },
    addComment: (state, action) => {
      const { memeId, comment } = action.payload;
      if (!state.comments[memeId]) {
        state.comments[memeId] = [];
      }
      state.comments[memeId].push(comment);
    },
  },
});

export const { setMemes, setLoading, setError, likeMeme, addComment } = memeSlice.actions;
export default memeSlice.reducer;
