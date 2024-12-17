import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const subCategorySlice = createSlice({
  name: "subCategorySlice",
  initialState: {
    availableSubCategories: [],
  },
  reducers: {
    handleSubCategories: (state, action) => {
      state.availableSubCategories = action.payload;
    },
  },
});
export const { handleSubCategories } = subCategorySlice.actions;
export const fetchSubCategories = () => async (dispatch) => {
  //   dispatch(setLoading()); // Dispatch loading state
  try {
    // const data = JSON.parse(localStorage.getItem('catId'));
    const response = await axios.get(
      `http://stock.swiftmore.in/mobileApis/TestCURD_subcategory.php`
    );
    console.log(response.data);
    const { subCat } = response.data;
    dispatch(handleSubCategories(subCat));
  } catch (error) {
    console.error("Error fetching data", error.response?.data || error.message);
  }
};

export default subCategorySlice.reducer;
