import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    availableCategories: [],
  },
  reducers: {
    handleCategories: (state, action) => {
      state.availableCategories = action.payload;
    },
  },
});
export const { handleCategories } = categorySlice.actions;
export const fetchCategories = () => async (dispatch) => {
  //   dispatch(setLoading()); // Dispatch loading state
  try {
    const response = await axios.get(
      "http://stock.swiftmore.in/mobileApis/TestCURD_category.php"
    );
    const { Cat } = response.data;
    dispatch(handleCategories(Cat)); // Dispatch categories to Redux store
  } catch (error) {
    //   dispatch(setError(error.message));  // Dispatch error if something went wrong
    console.error("Error fetching data", error.response?.data || error.message);
  }
};

export default categorySlice.reducer;
