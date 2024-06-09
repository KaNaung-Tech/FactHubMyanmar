import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'themes',
      columns: [
        { name: 'theme', type: 'string' },
      ],
    }),
  ],
});
