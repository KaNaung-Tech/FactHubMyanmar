import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import database from '../model/database';

// Fetch categories from API
const fetchCategoriesFromAPI = async () => {
  try {
    const response = await axios.get('https://blog.facthub-mm.org/wp-json/wp/v2/categories?per_page=100');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    return [];
  }
};

// Fetch categories from WatermelonDB
const fetchCategoriesFromDatabase = async () => {
  try {
    const categoriesCollection = database.collections.get('categories');
    const categories = await categoriesCollection.query().fetch();
    return categories.map(category => ({
      id: category.id, // WatermelonDB ID
      name: category.name,
    }));
  } catch (error) {
    console.error('Error fetching categories from database:', error);
    return [];
  }
};

// Sync categories to WatermelonDB
const syncCategoriesToDatabase = async (categories) => {
  try {
    await database.action(async () => {
      const categoriesCollection = database.collections.get('categories');
      
      // Destroy existing records
      const allCategories = await categoriesCollection.query().fetch();
      await Promise.all(allCategories.map(category => category.markAsDeleted())); // Mark as deleted
      await database.batch(...allCategories.map(category => category.destroyPermanently())); // Permanently delete

      // Insert new records
      await database.batch(
        ...categories.map(category => categoriesCollection.prepareCreate(record => {
          record._raw.id = category.id.toString(); // Ensure ID is a string
          record.name = category.name;
        }))
      );
    });
  } catch (error) {
    console.error('Error syncing categories to database:', error);
  }
};

// Main fetch function
export const fetchCategories = async () => {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    const categories = await fetchCategoriesFromAPI();
    await syncCategoriesToDatabase(categories);
    return categories;
  } else {
    return await fetchCategoriesFromDatabase();
  }
};
