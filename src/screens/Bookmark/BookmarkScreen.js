import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../configs/ThemeContext';
import { getCategories } from '../../services/api';
import BookmarkBtn from '../../asserts/svg/BookmarkBtn';
import Setting from '../../asserts/svg/Setting';

const BookmarkScreen = ({ navigation }) => {
  const { getTheme } = useTheme();
  const theme = getTheme();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkedPosts);
  // console.log('bookmarks',bookmarks)
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        console.log('fetchedCategories',fetchedCategories)
        const categoriesMap = fetchedCategories.reduce((map, category) => {
          map[category.id] = category.name;
          return map;
        }, {});
        setCategories(categoriesMap);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  const renderBookmark = (bookmark) => (
    <View
      key={bookmark.post_id}
      style={[styles.postContainer, { borderBottomColor: theme.textColor }]}
    >
      <View style={styles.postContentContainer}>
        <View style={styles.textContent}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetail', {
                categoryId: bookmark.categories.split(',')[0],
              })
            }
          >
            <View
              style={[
                styles.categoryContainer,
                { backgroundColor: theme.buttonColor },
              ]}
            >
              <Text style={[styles.categoryLabel, { color: theme.textColor }]}>
                {categories[bookmark.categories?.split(',')[0]]}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.postTitle, { color: theme.textColor }]}>
            {bookmark.title.rendered}
          </Text>
        </View>
        {bookmark.featured_media_url ? (
          <Image
            source={{ uri: bookmark.featured_media_url }}
            style={styles.featuredImage}
          />
        ) : null}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.authorContainer}>
          {bookmark.author_avatar_url ? (
            <Image
              style={styles.authorAvatar}
              source={{ uri: bookmark.author_avatar_url['96'] }}
            />
          ) : null}
          <Text style={[styles.authorName, { color: theme.textColor }]}>{`${bookmark.author_name} • ${new Date(bookmark.date).toLocaleDateString()}`}</Text>
        </View>
        <BookmarkBtn post={bookmark} isBookmark={true} /> 
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Bookmarks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Setting color={theme.textColor} />
        </TouchableOpacity>
      </View>
      {bookmarks.length > 0 ? (
        <ScrollView>
          {bookmarks.map((bookmark) => renderBookmark(bookmark))}
        </ScrollView>
      ) : (
        <View style={styles.content}>
          <Text style={[styles.message, { color: theme.textColor }]}>
            You haven't bookmarked any posts.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  },
  postContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
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

export default BookmarkScreen;
