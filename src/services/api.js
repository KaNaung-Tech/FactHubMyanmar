import axios from 'axios';
import database from '../model/database';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = 'https://blog.facthub-mm.org/wp-json/wp/v2';

const validateCategory = (category) => {
  const validatedCategory = {
    id: category?.id ? category.id.toString() : '0',
    name: category?.name || 'Unnamed Category',
    count: category?.count !== undefined ? parseInt(category.count, 10) : 0,
  };
  console.log('Validated Category:', validatedCategory);
  return validatedCategory;
};

const validatePost = (post) => ({
  post_id: post?.id ? post.id.toString() : '0',
  title: {
    rendered: post?.title?.rendered || 'No Title',
  },
  content: post?.content?.rendered || 'No Content',
  date: post?.date ? new Date(post.date).getTime() : Date.now(),
  categories: Array.isArray(post?.categories) ? post.categories.join(',') : '0',
  author_name: post?._embedded?.author?.[0]?.name || 'Unknown Author',
  featured_media_url: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
  details_title: post?.excerpt?.rendered || 'No Detail Title',
  author_avatar_url: post?._embedded?.author?.[0]?.avatar_urls || '',
});

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories?per_page=100`);
    console.log('API Categories Response:', response.data);
    return response.data.map(validateCategory);
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
};

const isOffline = async () => {
  const state = await NetInfo.fetch();
  return !state.isConnected;
};

const getCategories = async () => {
  const categoriesCollection = database.collections.get('categories');
  const localCategories = await categoriesCollection.query().fetch();
  const areLocalCategoriesValid = localCategories.length > 0 && localCategories.some(category => category.name);

  if (areLocalCategoriesValid) {
    return localCategories.map(category => ({
      id: category.id,
      name: category.name,
      count: category.count,
    }));
  }

  const offline = await isOffline();
  if (offline) {
    return localCategories.map(category => ({
      id: category.id,
      name: category.name,
      count: category.count,
    }));
  }

  const categories = await fetchCategories();
  const validCategories = categories.filter(cat => cat.name);

  try {
    await database.write(async () => {
      for (const cat of validCategories) {
        try {
          const existingCategory = await categoriesCollection.find(cat.id);
          await existingCategory.update(category => {
            category.name = cat.name;
            category.count = cat.count;
          });
        } catch (error) {
          if (error.message.includes('Record categories#')) {
            await categoriesCollection.create(category => {
              category._raw = {
                id: cat.id,
                name: cat.name,
                count: cat.count,
              };
            });
          } else {
            console.error('Unexpected error writing category to the database:', error);
          }
        }
      }
    });
  } catch (error) {
    console.error('Error writing categories to the database:', error);
  }

  return validCategories;
};

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?_embed&per_page=10`);
    const postsData = response.data.map(validatePost);
    return postsData;
  } catch (error) {
    console.error('Error fetching articles from API:', error);
    return [];
  }
};

const fetchForYouArticles = async (categoryIds) => {
  const categoriesQuery = categoryIds.join(',');
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?categories=${categoriesQuery}&per_page=100`);
    const postsData = response.data.map(validatePost);
    return postsData;
  } catch (error) {
    console.error('Error fetching "For You" articles from API:', error);
    return [];
  }
};

const getArticles = async () => {
  const offline = await isOffline();
  const postsCollection = database.collections.get('posts');

  if (offline) {
    const localPosts = await postsCollection.query().fetch();
    return localPosts.map(post => validatePost(post));
  }

  const postsData = await fetchArticles();
  await database.write(async () => {
    for (const post of postsData) {
      await postsCollection.create(newPost => {
        newPost._raw = post;
      });
    }
  });

  return postsData;
};

export { getArticles, getCategories, fetchForYouArticles };
