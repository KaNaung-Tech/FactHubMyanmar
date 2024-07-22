import database from '../model/database';
import { fetchCategories, fetchArticles } from './api';

const syncCategories = async () => {
  const categories = await fetchCategories();
  await database.write(async () => {
    await database.collections.get('categories').destroyAllPermanently(); // Clear previous categories
    await Promise.all(categories.map(category =>
      database.collections.get('categories').create(cat => {
        cat.name = category.name;
      })
    ));
  });
};


const syncArticles = async () => {
  const articles = await fetchArticles();
  await database.write(async () => {
    await Promise.all(articles.map(article =>
      database.collections.get('posts').create(post => {
        post.title = article.title.rendered;
        post.content = article.content.rendered;
        post.date = new Date(article.date).getTime();
        post.author = article.author; // Adjust based on actual data structure
      })
    ));
  });
};

export { syncCategories, syncArticles };

