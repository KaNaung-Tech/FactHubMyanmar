import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'date', type: 'number' },
        { name: 'categories', type: 'string' },
        { name: 'author_name', type: 'string' },
        { name: 'featured_media_url', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'themes',
      columns: [
        { name: 'theme', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'categories',
      columns: [
        { name: 'name', type: 'string' },
      ],
    }),
  ],
});
