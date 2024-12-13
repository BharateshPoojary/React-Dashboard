import { configureStore } from "@reduxjs/toolkit";
import userCredsReducer from "../slice/userCredsSlice.js";
import toggleReducer from "../slice/toggleSlice.js";
export default configureStore({
  reducer: {
    userCreds: userCredsReducer,
    toggleSlice: toggleReducer,
  },
});
