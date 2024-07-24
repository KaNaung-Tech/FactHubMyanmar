import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { setSelectedCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
