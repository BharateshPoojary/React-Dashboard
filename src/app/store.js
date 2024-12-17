import { configureStore } from "@reduxjs/toolkit";
import userCredsReducer from "../slice/userCredsSlice.js";
import toggleReducer from "../slice/toggleSlice.js";
import routeReducer from "../slice/routeSlice.js";
import categoryReducer from "../slice/categorySlice.js";
import searchInputReducer from "../slice/searchInputSlice.js";
import subCategoryReducer from "../slice/subCatSlice.js";
export default configureStore({
  reducer: {
    userCreds: userCredsReducer,
    toggleSlice: toggleReducer,
    routeSlice: routeReducer,
    categorySlice: categoryReducer,
    searchInputSlice: searchInputReducer,
    subCategorySlice: subCategoryReducer,
  },
});
