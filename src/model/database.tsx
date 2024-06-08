import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {schema} from './schema'; 
import Post from './Post';
import Theme from './Theme';

console.log('Initializing WatermelonDB database...');
const adapter = new SQLiteAdapter({
  schema,
  dbName: 'FactHubDB',
  jsi: true,
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});
console.log('Adapter:', adapter);
const database = new Database({
  adapter,
  modelClasses: [Post, Theme],
});
console.log('Database:', database);


export default database;
