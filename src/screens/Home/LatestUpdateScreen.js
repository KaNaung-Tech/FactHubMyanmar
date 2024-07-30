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
import {getArticles, getCategories} from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import database from '../../model/database';

const LatestUpdateScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategories();
        const categoriesMap = fetchedCategories.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        setCategories(categoriesMap);

        const fetchedArticles = await getArticles();
        const sortedArticles = fetchedArticles.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setPosts(sortedArticles);
      } catch (error) {
        console.error('Error fetching articles or categories:', error);
        const postCollection = database.collections.get('posts');
        const offlinePosts = await postCollection.query().fetch();
        const formattedPosts = offlinePosts.map(post => ({
          post_id: post.post_id,
          title: {rendered: post.title},
          content: post.content,
          date: new Date(post.date),
          categories: post.categories.split(','),
          author_name: post.author_name,
          featured_media_url: post.featured_media_url,
          details_title: post.details_title,
          author_avatar_url: post.author_avatar_url,
        }));
        const sortedOfflinePosts = formattedPosts.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setPosts(sortedOfflinePosts);
      }
    };

    fetchData();
  }, [theme]);

  const renderPost = post => (
    <View
      key={post.post_id}
      style={[styles.postContainer, {borderBottomColor: theme.textColor}]}>
      <View style={styles.postContentContainer}>
        <View style={styles.textContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryId: post.categories[0],
              })
            }>
            <View
              style={[
                styles.categoryContainer,
                {backgroundColor: theme.buttonColor},
              ]}>
              <Text style={[styles.categoryLabel, {color: theme.textColor}]}>
                {categories[post.categories[0]]}
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
      {posts.length > 0 ? (
        posts.map(post => renderPost(post))
      ) : (
        <Text style={{color: theme.textColor}}>No posts available.</Text>
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
});

export default LatestUpdateScreen;
