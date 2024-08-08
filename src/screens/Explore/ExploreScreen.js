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
import Setting from '../../asserts/svg/Setting';
import {getArticles, getCategories} from '../../services/api';
import SearchInput from '../../components/SearchInput';
import ArticleIcon from '../../asserts/svg/ArticleIcon';
import CategoryBackArrow from '../../asserts/svg/CategoryBackArrow';

const ExploreScreen = ({navigation}) => {
  const {getTheme} = useTheme();
  const theme = getTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [editorPicks, setEditorPicks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        console.log('Fetched categories:', categoriesData);
        const articlesData = await getArticles();
        setCategories(categoriesData);
        setEditorPicks(articlesData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching articles or categories:', error);
      }
    };

    fetchData();
  }, []);

  const renderCategory = category => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryContainer}
      onPress={() =>
        navigation.navigate('CategoryDetail', {categoryId: category.id})
      }>
      <View style={styles.categoryRow}>
        <ArticleIcon style={styles.categoryIcon} />
        <Text style={[styles.categoryName, {color: theme.textColor}]}>
          {category.name}
        </Text>
        <View style={styles.categoryBackIconContainer}>
          <CategoryBackArrow style={styles.categoryBackIcon}/>
        </View>
      </View>
      <Text style={[styles.blog, {color: theme.textColor}]}>
        {category.count} Blogs Uploaded
      </Text>
    </TouchableOpacity>
  );

  const renderEditorPick = post => (
    <View
      key={post.post_id}
      style={[styles.postContainer, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.postTitle, {color: theme.textColor}]}>
        {post.title.rendered}
      </Text>
      {post.featured_media_url && (
        <Image
          source={{uri: post.featured_media_url}}
          style={styles.postImage}
        />
      )}
      <Text style={[styles.postExcerpt, {color: theme.textColor}]}>
        {post.details_title.replace(/<[^>]+>/g, '')}
      </Text>
      <View style={styles.postInfo}>
        <Text style={[styles.postAuthor, {color: theme.textColor}]}>
          {post.author_name}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: theme.textColor}]}>
          Explore
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Setting color={theme.textColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchInput
          theme={theme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
            Categories List
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoriesList')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View>{categories.slice(0, 7).map(renderCategory)}</View>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: theme.textColor}]}>
            Editor Pick
          </Text>
        </View>
        <View>{editorPicks.map(renderEditorPick)}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#F56200',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryBackIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  categoryBackIcon: {
    marginLeft: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  blog: {
    fontSize: 14,
    marginLeft: 8,
  },
  postContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postExcerpt: {
    fontSize: 14,
    marginBottom: 8,
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
});

export default ExploreScreen;
