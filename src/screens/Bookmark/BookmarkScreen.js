import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import BookmarkContext from '../../context/BookmarkProvider';

const BookmarkScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [bookmarks, setBookmarks] = useState([]);
  const { bookmarkedPosts, toggleBookmark, isBookmarked } = useContext(BookmarkContext);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarkedPosts');
        if (storedBookmarks) {
          const parsedBookmarks = JSON.parse(storedBookmarks);
          const sortedBookmarks = parsedBookmarks.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBookmarks(sortedBookmarks);
        }
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    };
    loadBookmarks();
  }, [bookmarkedPosts]);

  const renderBookmark = ({ item: post }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Blog', { post })}>
      <View style={[styles.bookmarkContainer, { borderBottomColor: theme.textColor }]}>
        <View style={styles.leftColumn}>
          <Text style={[styles.bookmarkTitle, { color: theme.textColor }]}>{post.title.rendered}</Text>
          <Text style={[styles.postAuthor, { color: theme.textColor }]}>{`By ${post.author_name}\n${new Date(post.date).toLocaleDateString()}`}</Text>
        </View>
        <View style={styles.rightColumn}>
          {post.featured_media_url && (
            <Image source={{ uri: post.featured_media_url }} style={styles.bookmarkImage} />
          )}
          <TouchableOpacity onPress={() => toggleBookmark(post)} style={styles.bookmarkButton}>
            <BookmarkBtn width={24} height={24} fill={isBookmarked(post.id) ? theme.primaryColor : theme.textColor} />
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

      {bookmarkedPosts.length > 0 ? (
        <FlatList
          data={bookmarkedPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookmark}
          contentContainerStyle={styles.bookmarksList}
        />
      ) : (
        <View style={styles.content}>
          <Text style={[styles.message, { color: theme.textColor }]}>
            You don’t have any bookmarks for blogs to read
          </Text>
          <Text style={[styles.subMessage, { color: theme.textColor }]}>
            Tap the bookmark icon to add your favorite blog.
          </Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Explore')}>
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
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  leftColumn: {
    flex: 3,
    paddingRight: 10,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  bookmarkButton: {
    marginTop: 5,
  },
});

export default BookmarkScreen;
