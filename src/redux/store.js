import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/slice";

export const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});
