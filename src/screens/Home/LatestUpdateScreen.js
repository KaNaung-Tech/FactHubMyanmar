import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {useTheme} from '../../configs/ThemeContext';
import postsData from '../../data/posts.json';
import categoriesData from '../../data/categories.json';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LatestUpdateScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const sortedPosts = postsData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    setPosts(sortedPosts);

    const categoriesMap = categoriesData.reduce((map, category) => {
      map[category.id] = category.name;
      return map;
    }, {});
    setCategories(categoriesMap);
  }, [theme]);

  const renderPost = post => (
    <View
      key={post.id}
      style={[styles.postContainer, {borderBottomColor: theme.textColor}]}>
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
          <Text style={styles.categoryLabel}>
            {categories[post.categories[0]]}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.postTitle, {color: theme.textColor}]}>
        {post.title.rendered}
      </Text>
      {post.featured_media_url ? (
        <Image
          source={{uri: post.featured_media_url}}
          style={styles.postImage}
        />
      ) : null}
      <Text style={[styles.postAuthor, {color: theme.textColor}]}>{`By ${
        post.author
      } • ${new Date(post.date).toLocaleDateString()}`}</Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView style={styles.postsList}>
        {posts.length > 0 ? (
          posts.map(renderPost)
        ) : (
          <Text style={{color: theme.textColor}}>No posts available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    color: '#F56200',
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
  postExcerpt: {
    fontSize: 14,
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

export default LatestUpdateScreen;
