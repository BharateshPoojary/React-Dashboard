import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mobileNo: "",
  userName: "",
  password: "",
  success: 0,
  userId: 0,
};
const userCredsSlice = createSlice({
  name: "userCreds",
  initialState,
  reducers: {
    //Reducers are functions that specify how the application state should change in response to actions.
    // Action to update user credentials
    updateUserCreds: (state, action) => {
      //This is the action we are dispatching
      state.userName = action.payload.userName;
      state.password = action.payload.password;
      state.mobileNo = action.payload.mobileNo;
      state.success = action.payload.success;
      state.userId = action.payload.userId;
    },
  },
});
export const { updateUserCreds } = userCredsSlice.actions;

export default userCredsSlice.reducer;
