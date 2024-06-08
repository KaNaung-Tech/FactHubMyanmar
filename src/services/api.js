export const fetchPosts = async () => {
    try {
      const response = await fetch('https://blog.facthub-mm.org/wp-json/wp/v2/posts');
      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };
  