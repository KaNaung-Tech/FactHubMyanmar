import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import postsReducer from './slices/postsSlice';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
  },
});
