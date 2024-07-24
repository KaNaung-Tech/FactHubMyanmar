import axios from 'axios';

const API_BASE_URL = 'https://blog.facthub-mm.org/wp-json/wp/v2';

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories?per_page=100`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
};

const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?per_page=100&_embed`);
    const postsData = response.data;
    const sortedPosts = postsData.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
    return sortedPosts.map(post => ({
      ...post,
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      author_name: post._embedded?.author?.[0]?.name,
    }));
  } catch (error) {
    console.error('Error fetching articles from API:', error);
    return [];
  }
};

export { fetchCategories, fetchArticles };
