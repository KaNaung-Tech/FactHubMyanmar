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
import postsData from '../../data/posts.json';
import categoriesData from '../../data/categories.json';

const ForYouScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Simulate API fetch or async data loading
    const fetchData = async () => {
      // Sort posts by title
      const sortedPosts = postsData.sort((a, b) =>
        a.title.rendered.localeCompare(b.title.rendered),
      );
      setPosts(sortedPosts);

      // Map categories to an object for quick lookup
      const categoriesMap = categoriesData.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});
      setCategories(categoriesMap);
    };

    fetchData();
  }, [theme]); // Depend on theme changes for data refresh if needed

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
      {post.featured_media_url && (
        <Image
          source={{uri: post.featured_media_url}}
          style={styles.postImage}
        />
      )}
      <Text style={styles.postAuthor}>{`By ${post.author} • ${new Date(
        post.date,
      ).toLocaleDateString()}`}</Text>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView style={styles.postsList}>{posts.map(renderPost)}</ScrollView>
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
    // borderBottomColor: '#F4F4F6',
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
