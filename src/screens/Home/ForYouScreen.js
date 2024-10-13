import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import { fetchArticles, fetchCategories } from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn'; // Import your BookmarkBtn SVG
import BookmarkContext from '../../context/BookmarkProvider'; // Import Bookmark context

const ForYouScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);  // New state to track error

  // Access BookmarkContext
  const { toggleBookmark, isBookmarked } = useContext(BookmarkContext);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        const sortedPosts = fetchedArticles.sort((a, b) =>
          a.title.rendered.localeCompare(b.title.rendered),
        );
        const postsWithMediaAndAuthor = sortedPosts.map(post => ({
          ...post,
          featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
          author_name: post._embedded?.author?.[0]?.name || 'Unknown Author',
        }));
        setPosts(postsWithMediaAndAuthor);

        const categoriesResponse = await fetchCategories();
        const categoriesMap = categoriesResponse.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        setCategories(categoriesMap);
      } catch (error) {
        console.error('Error fetching articles or categories:', error);
        setIsError(true);  // Set error state to true if there is an issue
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [theme]);

  const renderPost = ({ item: post }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Blog', {
          post, // Passing the post data to BlogScreen
        })
      }>
      <View
        key={post.id}
        style={[styles.postContainer, { borderBottomColor: theme.textColor }]}>
        
        {/* Category */}
      
          <View
            style={[
              styles.categoryContainer,
              { backgroundColor: theme.buttonColor },
            ]}>
            <Text style={[styles.categoryLabel, { color: theme.textColor }]}>
              {categories[post.categories[0]]}
            </Text>
          </View>
        
        {/* Title */}
        <Text style={[styles.postTitle, { color: theme.textColor }]}>
          {post.title.rendered}
        </Text>
        
        {/* Featured Image */}
        {post.featured_media_url && (
          <Image
            source={{ uri: post.featured_media_url }}
            style={styles.postImage}
          />
        )}
        
        {/* Author and Date */}
        <View style={styles.postInfoContainer}>
  <Text style={[styles.postAuthor, { color: theme.textColor }]}>
    {`By ${post.author_name}\n${new Date(post.date).toLocaleDateString()}`}
  </Text>

  {/* Bookmark Button */}
  <TouchableOpacity onPress={() => toggleBookmark(post)} style={styles.bookmarkButton}>
    <BookmarkBtn
      width={24}
      height={24}
      fill={isBookmarked(post.id) ? theme.primaryColor : theme.textColor} // Change icon color based on bookmark state
    />
  </TouchableOpacity>
</View>

      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color={theme.textColor} />
          <Text style={[styles.loadingText, { color: theme.textColor }]}>
            Loading...
          </Text>
          {isError && (
            <Text style={[styles.errorText, { color: theme.textColor }]}>
              There is no connection, please open the internet and try again.
            </Text>
          )}
        </View>
      </Modal>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={posts}
        keyExtractor={post => post.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.postsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Makes the background darker
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  postsList: {
    paddingBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 2,
  },
  postInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // To push the bookmark button to the right
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 10,
  },
  bookmarkButton: {
    marginLeft: 10, // Add some spacing between text and button
  },
  categoryLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  categoryContainer: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 12,
    color: '#777',
  },
  bookmarkButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default ForYouScreen;
