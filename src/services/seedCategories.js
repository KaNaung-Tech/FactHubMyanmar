import database from './database';
import categoriesData from './categories.json';

const seedCategories = async () => {
  await database.write(async () => {
    const categoriesCollection = database.collections.get('categories');

    // Clear existing data if needed
    const existingCategories = await categoriesCollection.query().fetch();
    await Promise.all(existingCategories.map(cat => cat.markAsDeleted()));
    await Promise.all(existingCategories.map(cat => cat.destroyPermanently()));

    // Insert new data
    await Promise.all(
      categoriesData.map((category) =>
        categoriesCollection.create((newCategory) => {
          newCategory.name = category.name;
        })
      )
    );
  });

  console.log('Database seeded with categories');
};

seedCategories();
