import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: {},
  },

  reducers: {
    logIn(state, action) {
      state.isUser = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      console.log(action.payload);
    },
  },
});

export default UserSlice;
export const { setUserInfo } = UserSlice.actions;
