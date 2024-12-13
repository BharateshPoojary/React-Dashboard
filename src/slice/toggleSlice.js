import { createSlice } from "@reduxjs/toolkit";
const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    value: "sun",
  },
  reducers: {
    darkTheme: (state) => {
      state.value = "moon";
    },
    lightTheme: (state) => {
      state.value = "sun";
    },
  },
});
export default toggleSlice.reducer;
export const { darkTheme, lightTheme } = toggleSlice.actions;
