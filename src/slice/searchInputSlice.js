import { createSlice } from "@reduxjs/toolkit";
const searchInputSlice = createSlice({
  name: "searchInputSlice",
  initialState: {
    inputValue: "",
  },
  reducers: {
    handleSearchInput: (state, action) => {
      state.inputValue = action.payload;
    },
  },
});
export const { handleSearchInput } = searchInputSlice.actions;
export default searchInputSlice.reducer;
