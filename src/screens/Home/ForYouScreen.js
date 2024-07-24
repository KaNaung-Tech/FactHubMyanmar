import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, getCategories } from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import { loadPosts } from '../../redux/slices/postsSlice';

const ForYouScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const selectedCategories = useSelector(state => state.categories.selectedCategories);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const loadPostsAndCategories = async () => {
      const fetchedArticles = await getArticles();
      const categoriesResponse = await getCategories();
      const categoriesMap = categoriesResponse.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});
      setCategories(categoriesMap);
      dispatch(loadPosts(fetchedArticles));
    };

    loadPostsAndCategories();
  }, [dispatch]);

  const filteredPosts = posts.filter(post =>
    post.categories.some(categoryId =>
      selectedCategories.includes(categories[categoryId])
    )
  );

  const renderPost = post => (
    <View
      key={post.id}
      style={[styles.postContainer, { borderBottomColor: theme.textColor }]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CategoryDetail', {
            categoryId: post.categories[0],
          })
        }>
        <View
          style={[
            styles.categoryContainer,
            { backgroundColor: theme.buttonColor },
          ]}>
          <Text style={[styles.categoryLabel, { color: theme.textColor }]}>
            {categories[post.categories[0]]}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.postTitle, { color: theme.textColor }]}>
        {post.title.rendered}
      </Text>
      {post.featured_media_url && (
        <Image
          source={{ uri: post.featured_media_url }}
          style={styles.postImage}
        />
      )}
      <Text style={[styles.postAuthor, { color: theme.textColor }]}>{`By ${
        post.author_name
      } • ${new Date(post.date).toLocaleDateString()}`}</Text>
      <BookmarkBtn />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView style={styles.postsList}>
        {filteredPosts.map(renderPost)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#555',
  },
  postsList: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 2,
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
});

export default ForYouScreen;
