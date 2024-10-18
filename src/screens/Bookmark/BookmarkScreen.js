import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn'; // Optional if you want to show the bookmark icon

const BookmarkScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from AsyncStorage and sort by date
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        if (storedBookmarks) {
          const parsedBookmarks = JSON.parse(storedBookmarks);
          // Sort bookmarks by post.date in descending order (newest first)
          const sortedBookmarks = parsedBookmarks.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBookmarks(sortedBookmarks);
        }
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  const renderBookmark = ({ item: post }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Blog', {
          post, // Passing the post data to BlogScreen
        })
      }>
      <View
        key={post.id}
        style={[styles.bookmarkContainer, { borderBottomColor: theme.textColor }]}>
        
        {/* Left Column: Title, Author, and Date */}
        <View style={styles.leftColumn}>
         
  
          {/* Title */}
          <Text style={[styles.bookmarkTitle, { color: theme.textColor }]}>
            {post.title.rendered}
          </Text>
  
          {/* Author and Date */}
          <Text style={[styles.postAuthor, { color: theme.textColor }]}>
            {`By ${post.author_name}\n${new Date(post.date).toLocaleDateString()}`}
          </Text>
        </View>
  
        {/* Right Column: Image and Bookmark Button */}
        <View style={styles.rightColumn}>
          {/* Featured Image */}
          {post.featured_media_url && (
            <Image
              source={{ uri: post.featured_media_url }}
              style={styles.bookmarkImage}
            />
          )}
  
          {/* Bookmark Button */}
          <TouchableOpacity onPress={() => toggleBookmark(post)} style={styles.bookmarkButton}>
            <BookmarkBtn
              width={24}
              height={24}
              // fill={isBookmarked(post.id) ? theme.primaryColor : theme.textColor} // Change icon color based on bookmark state
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Bookmarks</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Setting color={theme.textColor} />
        </TouchableOpacity>
      </View>

      {bookmarks.length > 0 ? (
        // Show bookmarks in a list if there are any
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookmark}
          contentContainerStyle={styles.bookmarksList}
        />
      ) : (
        // Default message when there are no bookmarks
        <View style={styles.content}>
          <Text style={[styles.message, { color: theme.textColor }]}>
            You don’t have any bookmarks for blogs to read
          </Text>
          <Text style={[styles.subMessage, { color: theme.textColor }]}>
            Tap the bookmark icon to add your favorite blog.
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.browseButtonText}>Start browsing</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  subMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#777',
  },
  browseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#F56200',
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookmarksList: {
    paddingBottom: 20,
  },
  bookmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookmarkTitle: {
    fontSize: 18,
  },
  bookmarkContainer: {
    flexDirection: 'row', // Two columns layout
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  leftColumn: {
    flex: 3, // Left column takes more space
    paddingRight: 10, // Add some padding between columns
  },
  rightColumn: {
    flex: 1, // Right column takes less space
    justifyContent: 'space-between', // Space between image and bookmark icon
    alignItems: 'center',
  },
  categoryContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  categoryLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 12,
    color: '#777',
  },
  bookmarkImage: {
    width: 80, // Smaller image size for the bookmark
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bookmarkButton: {
    marginTop: 5,
  },
});

export default BookmarkScreen;
