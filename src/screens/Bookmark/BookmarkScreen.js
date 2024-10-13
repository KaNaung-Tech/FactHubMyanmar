import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn'; // Optional if you want to show the bookmark icon

const BookmarkScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from AsyncStorage
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };

    loadBookmarks();
  }, []);

  // Render each bookmarked post
  const renderBookmark = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Blog', {
          post: item, // Passing the bookmarked post to the BlogScreen
        })
      }
    >
      <View style={styles.bookmarkContainer}>
        <Text style={[styles.bookmarkTitle, { color: theme.textColor }]}>
          {item.title.rendered}
        </Text>
        <BookmarkBtn width={24} height={24} fill={theme.primaryColor} />
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
});

export default BookmarkScreen;
