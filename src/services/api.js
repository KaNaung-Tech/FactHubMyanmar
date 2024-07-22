import axios from 'axios';

const API_BASE_URL = 'https://blog.facthub-mm.org/wp-json/wp/v2';

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories?per_page=100`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
};

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data.map(post => ({
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      date: new Date(post.date).getTime(),
      author: post.author,
    }));
  } catch (error) {
    console.error('Error fetching articles from API:', error);
    return [];
  }
};

export { fetchCategories, fetchArticles };
