import { configureStore } from "@reduxjs/toolkit";
import loadingSliceReducer from "../features/loadingSlice";

const store = configureStore({
  reducer: {
    loading: loadingSliceReducer,
  },
});

export default store;
