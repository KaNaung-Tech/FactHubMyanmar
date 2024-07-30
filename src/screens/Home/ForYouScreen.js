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
import {getArticles, getCategories} from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import {loadPosts} from '../../redux/slices/postsSlice';

const ForYouScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const selectedCategories = useSelector(
    state => state.categories.selectedCategories,
  );
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const loadPostsAndCategories = async () => {
      try {
        const fetchedArticles = await getArticles();
        console.log('fetchedArticles',fetchedArticles[0])
        const categoriesResponse = await getCategories();
        // console.log('categoriesResponse',categoriesResponse)
        const categoriesMap = categoriesResponse.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        console.log("categoriesMap",categoriesMap)
        setCategories(categoriesMap);
        dispatch(loadPosts(fetchedArticles));
      } catch (error) {
        console.error('Error loading posts and categories:', error);
      }
    };

    loadPostsAndCategories();
  }, [dispatch]);

  const filteredPosts = posts.filter(post =>
    post.categories
      .split(',')
      .some(categoryId => selectedCategories.includes(categories[categoryId])),
  );

  const renderPost = post => (
    <View
      key={post.post_id}
      style={[styles.postContainer, {borderBottomColor: theme.textColor}]}>
      <View style={styles.postContentContainer}>
        <View style={styles.textContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryId: post.categories.split(',')[0],
              })
            }>
            <View
              style={[
                styles.categoryContainer,
                {backgroundColor: theme.buttonColor},
              ]}>
              <Text style={[styles.categoryLabel, {color: theme.textColor}]}>
                {categories[post.categories.split(',')[0]]}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.postTitle, {color: theme.textColor}]}>
            {post.title.rendered}
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
          <Text style={[styles.authorName, {color: theme.textColor}]}>{`${
            post.author_name
          } • ${new Date(post.date).toLocaleDateString()}`}</Text>
        </View>
        <BookmarkBtn post={post} />
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      {filteredPosts.map(renderPost)}
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
});

export default ForYouScreen;
