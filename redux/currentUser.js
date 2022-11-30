import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isAdmin: false,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setCurrentUser, setIsAdmin } = currentUserSlice.actions;
export default currentUserSlice.reducer;
