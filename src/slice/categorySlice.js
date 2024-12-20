import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    availableCategories: [],
    categories: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    handleCategories: (state, action) => {
      state.availableCategories = action.payload;
      state.loading = false;
    },
    addCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});
export const { handleCategories, addCategories, setLoading } =
  categorySlice.actions;
export const fetchCategories = () => async (dispatch) => {
  //   dispatch(setLoading()); // Dispatch loading state
  dispatch(setLoading(true));
  setTimeout(async () => {
    //remove this after all completion added to see loader
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
      console.error(
        "Error fetching data",
        error.response?.data || error.message
      );
      dispatch(setLoading(false));
    }
  }, 6000);
};

export default categorySlice.reducer;
