import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: {},
    allUsers: [],
    userId: "",
    searchMode: false,
    isDelete: false,
    deletedItemId: null,
  },

  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setSearchMode(state, action) {
      state.searchMode = action.payload;
    },
    setIsDelete(state, action) {
      state.isDelete = action.payload;
    },
    setDeletedItemId(state, action) {
      state.deletedItemId = action.payload;
    },
  },
});

export default UserSlice;
export const { setUserInfo } = UserSlice.actions;
export const { setAllUsers } = UserSlice.actions;
export const { setUserId } = UserSlice.actions;
export const { setSearchMode } = UserSlice.actions;
export const { setIsDelete } = UserSlice.actions;

export const { setDeletedItemId } = UserSlice.actions;
