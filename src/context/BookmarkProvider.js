import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // Load bookmarks from AsyncStorage when the app starts
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        if (storedBookmarks) {
          setBookmarkedPosts(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage whenever they change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    };

    if (bookmarkedPosts.length > 0) {
      saveBookmarks();
    }
  }, [bookmarkedPosts]);

  // Toggle bookmark for a specific post
  const toggleBookmark = (post) => {
    setBookmarkedPosts((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((p) => p.id === post.id);
      if (isBookmarked) {
        return prevBookmarks.filter((p) => p.id !== post.id); // Remove if already bookmarked
      } else {
        return [...prevBookmarks, post]; // Add if not bookmarked
      }
    });
  };

  // Check if a post is bookmarked
  const isBookmarked = (postId) => {
    return bookmarkedPosts.some((p) => p.id === postId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedPosts, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
