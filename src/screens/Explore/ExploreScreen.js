import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../configs/ThemeContext';
import Setting from '../../asserts/svg/Setting';
import { fetchArticles, fetchCategories } from '../../services/api';
import SearchInput from '../../components/SearchInput';

const ExploreScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [editorPicks, setEditorPicks] = useState([]);

  useEffect(() => {
    // Fetch categories and editor picks
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      const articlesData = await fetchArticles();
      setCategories(categoriesData);
      setEditorPicks(articlesData.slice(0, 4)); // Assume editor picks are the first 4 posts
    };

    fetchData();
  }, []);

  const renderCategory = (category) => (
    <TouchableOpacity key={category.id} style={styles.categoryContainer} onPress={() => navigation.navigate('CategoryDetail', { categoryId: category.id })}>
      <Text style={[styles.categoryName, { color: theme.textColor }]}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderEditorPick = (post) => (
    <View key={post.id} style={[styles.postContainer, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.postTitle, { color: theme.textColor }]}>{post.title.rendered}</Text>
      {post.featured_media_url && (
        <Image source={{ uri: post.featured_media_url }} style={styles.postImage} />
      )}
      {post.excerpt.rendered ? (
        <Text style={[styles.postExcerpt, { color: theme.textColor }]}>{post.excerpt.rendered.replace(/<[^>]+>/g, '')}</Text>
      ) : null}
      <View style={styles.postInfo}>
        <Text style={[styles.postAuthor, { color: theme.textColor }]}>{post.author_name}</Text>
        <Text style={[styles.postDate, { color: theme.textColor }]}>{` • ${new Date(post.date).toLocaleDateString()}`}</Text>
        <Text style={[styles.postReadTime, { color: theme.textColor }]}>{` • ${post.read_time} mins read`}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Explore</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Setting color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarontainer}>
      <SearchInput
        theme={theme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Categories List</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoriesList')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {categories.map(renderCategory)}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>Editor Pick</Text>
        </View>
        {editorPicks.map(renderEditorPick)}
      </ScrollView>
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#F56200',
  },
  categoryContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F6',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F6',
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 5,
  },
  postExcerpt: {
    marginBottom: 5,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAuthor: {
    fontSize: 12,
  },
  postDate: {
    fontSize: 12,
  },
  postReadTime: {
    fontSize: 12,
  },
});

export default ExploreScreen;
