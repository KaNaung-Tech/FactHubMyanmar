import database from '../model/database';
import { fetchCategories } from './api';
import { isOffline } from './network';

const getCategories = async () => {
  const categoriesCollection = database.collections.get('categories');
  let localCategories = await categoriesCollection.query().fetch();

  if (localCategories.length > 0) {
    return localCategories.map(category => ({
      id: category.id,
      name: category.name,
    }));
  }

  const offline = await isOffline();
  if (offline) {
    return localCategories;
  }

  const categories = await fetchCategories();
  await database.write(async () => {
    await categoriesCollection.create(category => {
      category.name = category.name;
    });
  });

  return categories;
};

const getArticles = async () => {
  const postsCollection = database.collections.get('posts');
  const offline = await isOffline();

  if (offline) {
    return postsCollection.query().fetch();
  }

  const articles = await fetchArticles();
  await database.write(async () => {
    await postsCollection.create(post => {
      post.title = article.title;
      post.content = article.content;
      post.date = article.date;
      post.author = article.author;
    });
  });

  return articles;
};

export { getCategories, getArticles };
