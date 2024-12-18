import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    availableCategories: [],
    categories: [],
  },
  reducers: {
    handleCategories: (state, action) => {
      state.availableCategories = action.payload;
    },
    addCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});
export const { handleCategories, addCategories } = categorySlice.actions;
export const fetchCategories = () => async (dispatch) => {
  //   dispatch(setLoading()); // Dispatch loading state
  try {
    const response = await axios.get(
      "http://stock.swiftmore.in/mobileApis/TestCURD_category.php"
    );
    const { Cat } = response.data;
    dispatch(handleCategories(Cat)); // Dispatch categories to Redux store
    // dispatch(addCategories(initialState.availableCategories));
    console.log("fetchcatinoked");
    return Cat;
  } catch (error) {
    //   dispatch(setError(error.message));  // Dispatch error if something went wrong
    console.error("Error fetching data", error.response?.data || error.message);
  }
};

export default categorySlice.reducer;
