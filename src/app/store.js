import { configureStore } from "@reduxjs/toolkit";
import userCredsReducer from "../slice/userCredsSlice.js";
export default configureStore({
  reducer: {
    userCreds: userCredsReducer,
  },
});
