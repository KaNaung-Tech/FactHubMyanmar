import axios from 'axios';

// Function to fetch posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get('https://blog.facthub-mm.org/wp-json/wp/v2/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://blog.facthub-mm.org/wp-json/wp/v2/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
