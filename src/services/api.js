// api.js
import axios from 'axios';
import database from '../model/database';
import NetInfo from '@react-native-community/netinfo';

const API_BASE_URL = 'https://blog.facthub-mm.org/wp-json/wp/v2';

// Helper function to validate and sanitize the category data
const validateCategory = (category) => {
  return {
    id: typeof category.id === 'number' ? category.id.toString() : null,
    name: typeof category.name === 'string' ? category.name : 'Unnamed Category',
  };
};

// Helper function to validate and sanitize the post data
const validatePost = (post) => {
  return {
    ...post,
    title: {
      rendered: typeof post.title?.rendered === 'string' ? post.title.rendered : '',
    },
    _embedded: {
      'wp:featuredmedia': Array.isArray(post._embedded?.['wp:featuredmedia']) ? post._embedded['wp:featuredmedia'] : [],
      author: Array.isArray(post._embedded?.author) ? post._embedded.author : [],
    },
    categories: Array.isArray(post.categories) ? post.categories : [],
    featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    author_name: post._embedded?.author?.[0]?.name || '',
  };
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories?per_page=100`);
    console.log('API Categories Response:', response.data); // Log the raw API response
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

  // Check if local categories are available and valid
  const areLocalCategoriesValid = localCategories.length > 0 && localCategories.some(category => category.name);

  if (areLocalCategoriesValid) {
    console.log('Using local categories:', localCategories);
    return localCategories.map(category => ({
      id: category.id,
      name: category.name,
    }));
  }

  // If offline, return whatever local categories we have
  const offline = await isOffline();
  if (offline) {
    console.log('Offline mode, using local categories:', localCategories);
    return localCategories.map(category => ({
      id: category.id,
      name: category.name,
    }));
  }

  // Fetch categories from the API
  const categories = await fetchCategories();
  const validCategories = categories.filter(cat => cat.name); // Filter out categories with empty names
  console.log('Fetched categories from API:', validCategories);

  // Store fetched categories to local database
  await database.write(async () => {
    for (const cat of validCategories) {
      await categoriesCollection.create(category => {
        category._raw = {
          id: cat.id,
          name: cat.name,
        };
      });
    }
  });

  return validCategories;
};

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?per_page=100&_embed`);
    const postsData = response.data.map(validatePost);
    const sortedPosts = postsData.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
    return sortedPosts;
  } catch (error) {
    console.error('Error fetching articles from API:', error);
    return [];
  }
};

const getArticles = async () => {
  const postsCollection = database.collections.get('posts');
  const offline = await isOffline();

  if (offline) {
    const localPosts = await postsCollection.query().fetch();
    return localPosts.map(post => ({
      ...post._raw,
      categories: post._raw.categories.split(',').map(Number), // Convert back to array of numbers
    }));
  }

  const articles = await fetchArticles();
  await database.write(async () => {
    for (const article of articles) {
      await postsCollection.create(post => {
        post._raw = {
          ...article,
          categories: article.categories.join(','), // Store as a comma-separated string
        };
      });
    }
  });

  return articles;
};

export { fetchCategories, fetchArticles, getCategories, getArticles, isOffline };

