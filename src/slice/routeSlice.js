import { createSlice } from "@reduxjs/toolkit";
const routeList = [
  "alert",
  "button",
  "category",
  "card",
  "form",
  "typography",
  "icon",
  "sample",
  "subcategory",
  "profile",
  "login",
  "register",
];
const routeSlice = createSlice({
  name: "routeSlice",
  initialState: {
    matchedRoutes: null,
  },
  reducers: {
    checkRouteMatch: (state, action) => {
      const userInputVal = action.payload.toLowerCase();
      const matchedRoute = routeList.find((route) =>
        route.startsWith(userInputVal)
      ); //It returns the route which matched first
      state.matchedRoutes = matchedRoute || null; //if no such route is present then it will give null value
    },
  },
});
export default routeSlice.reducer;
export const { checkRouteMatch } = routeSlice.actions;
