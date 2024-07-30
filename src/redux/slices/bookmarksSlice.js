import {createSlice} from '@reduxjs/toolkit';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    bookmarkedPosts: [],
  },
  reducers: {
    addBookmark: (state, action) => {
      if (state.bookmarkedPosts.length > 0) {
        const exists = state.bookmarkedPosts?.some(
          bookmarkedPost => bookmarkedPost.post_id === action.payload.post_id,
        );

        if (!exists) {
          state.bookmarkedPosts.push(action.payload);
        }
      } else {
        state.bookmarkedPosts.push(action.payload);
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarkedPosts = state.bookmarkedPosts.filter(
        post => post.post_id !== action.payload,
      );
    },
  },
});

export const {addBookmark, removeBookmark} = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
