import database from '../model/database';
import { fetchPosts } from './api';

export const syncPosts = async () => {
  const posts = await fetchPosts();
  await database.action(async () => {
    const postsCollection = database.collections.get('posts');
    await Promise.all(
      posts.map(post =>
        postsCollection.create(record => {
          record.title = post.title.rendered;
          record.content = post.content.rendered;
          record.date = new Date(post.date).getTime();
          record.author = post.author_name; // assuming the API provides an author_name field
        })
      )
    );
  });
};
