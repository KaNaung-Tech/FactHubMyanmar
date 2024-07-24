import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/slices/bookmarksSlice';

const BookmarkButton = ({ post }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);
  const isBookmarked = bookmarks.some(bookmark => bookmark.id === post.id);

  const handlePress = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(post));
    } else {
      dispatch(addBookmark(post));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isBookmarked && styles.bookmarked]}
      onPress={handlePress}>
      <Text style={styles.buttonText}>
        {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  bookmarked: {
    backgroundColor: '#F56200',
  },
  buttonText: {
    color: '#000',
  },
});

export default BookmarkButton;
