import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import Post from './Post';
import Theme from './Theme';
import Category from './Category';
import migrations from './migrations';
import OnboardingSelection from './OnboardingSelection';


const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'FactHubDB',
  jsi: true,
  onSetUpError: (error) => {
    console.error('Database setup error:', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [Post, Theme,Category,OnboardingSelection],
});

export default database;
