import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../configs/ThemeContext';
import {useDispatch, useSelector} from 'react-redux';
import {getCategories, fetchForYouArticles} from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import {loadPosts} from '../../redux/slices/postsSlice';
import database from '../../model/database';

const ForYouScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPostsAndCategories = async () => {
      setLoading(true);
      try {
        console.log('Fetching "For You" articles and categories...');

        const onboardingSelections = await database.collections
          .get('onboarding_selections')
          .query()
          .fetch();
        console.log('Fetched onboarding selections:', onboardingSelections);

        const selectedCategoryIds = onboardingSelections.map(selection => selection.categoryId);
        console.log('Selected category IDs:', selectedCategoryIds);

        const fetchedArticles = await fetchForYouArticles(selectedCategoryIds);
        console.log('Fetched "For You" articles:', fetchedArticles[0]);

        const categoriesResponse = await getCategories();
        console.log('Fetched categories:', categoriesResponse);

        const categoriesMap = categoriesResponse.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        console.log('Categories map:', categoriesMap);
        setCategories(categoriesMap);

        dispatch(loadPosts(fetchedArticles));

        const selectedCategoryObjects = onboardingSelections.map(selection => ({
          categoryId: selection.categoryId,
          categoryName: selection.categoryName,
        }));
        console.log('Selected categories:', selectedCategoryObjects);
        setSelectedCategories(selectedCategoryObjects);
      } catch (error) {
        console.error('Error loading posts and categories:', error);
        setError('Failed to load posts or categories.');
      } finally {
        setLoading(false);
      }
    };

    loadPostsAndCategories();
  }, [dispatch]);

  useEffect(() => {
    console.log('Posts:', posts);
    console.log('Categories:', categories);
    console.log('Selected Categories:', selectedCategories);
  }, [posts, categories, selectedCategories]);

  const convertCategoriesToArray = categoriesString => {
    if (!categoriesString) {
      return [];
    }
    return categoriesString
      .split(',')
      .map(category => parseInt(category.trim()));
  };

  const filteredPosts = posts.filter(post => {
    if (!post.categories) return false;
    const postCategoryIds = convertCategoriesToArray(post.categories);

    const matched = postCategoryIds.some(categoryId =>
      selectedCategories.includes(categoryId.toString()),
    );

    console.log('Post Categories:', postCategoryIds);
    console.log('Post Matched:', matched);

    return matched;
  });

  console.log('Filtered posts:', filteredPosts);

  const renderPost = post => (
    <View
      key={post.post_id}
      style={[styles.postContainer, {borderBottomColor: theme.textColor}]}>
      <View style={styles.postContentContainer}>
        <View style={styles.textContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryId: convertCategoriesToArray(post.categories)[0],
              })
            }>
            <View
              style={[
                styles.categoryContainer,
                {backgroundColor: theme.buttonColor},
              ]}>
              <Text style={[styles.categoryLabel, {color: theme.textColor}]}>
                {categories[convertCategoriesToArray(post.categories)[0]] ||
                  'Unknown Category'}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.postTitle, {color: theme.textColor}]}>
            {post.title.rendered || 'Untitled'}
          </Text>
        </View>
        {post.featured_media_url ? (
          <Image
            source={{uri: post.featured_media_url}}
            style={styles.featuredImage}
          />
        ) : null}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.authorContainer}>
          {post.author_avatar_url ? (
            <Image
              style={styles.authorAvatar}
              source={{uri: post.author_avatar_url['96']}}
            />
          ) : null}
          <Text style={[styles.authorName, {color: theme.textColor}]}>
            {`${post.author_name || 'Unknown Author'} • ${new Date(
              post.date,
            ).toLocaleDateString()}`}
          </Text>
        </View>
        <BookmarkBtn post={post} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.noPosts, {color: theme.textColor}]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <Text style={[styles.noPosts, {color: theme.errorColor}]}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {filteredPosts.length > 0 ? (
        filteredPosts.map(renderPost)
      ) : (
        <Text style={[styles.noPosts, {color: theme.textColor}]}>
          No posts available
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  postContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  textContent: {
    width: '50%',
    paddingRight: 8,
  },
  categoryContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredImage: {
    width: '50%',
    height: '100%',
    borderRadius: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 12,
    marginLeft: 8,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  noPosts: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default ForYouScreen;
