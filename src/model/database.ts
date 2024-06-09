import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import Post from './Post';
import Theme from './Theme';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'FactHubDB',
  jsi: true,
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Post, Theme],
});

export default database;
