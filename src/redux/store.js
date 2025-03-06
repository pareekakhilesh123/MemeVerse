import { configureStore } from "@reduxjs/toolkit";
import memeReducer from "./memeSlice";

const store = configureStore({
  reducer: {
    memes: memeReducer,
  },
});

export default store;
