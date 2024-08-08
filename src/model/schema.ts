import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'posts',
      columns: [
        {name: 'post_id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'date', type: 'number'},
        {name: 'categories', type: 'string'},
        {name: 'author_name', type: 'string'},
        {name: 'featured_media_url', type: 'string', isOptional: true},
        {name: 'details_title', type: 'string', isOptional: true}, // New field
        {name: 'author_avatar_url', type: 'string', isOptional: true}, // New field
      ],
    }),
    tableSchema({
      name: 'themes',
      columns: [{name: 'theme', type: 'string'}],
    }),
    tableSchema({
      name: 'categories',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'count', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'onboarding_selections',
      columns: [
        { name: 'category_name', type: 'string' },
        { name: 'created_at', type: 'number' },
        {name: 'category_id',type: 'string'},
      ],
    }),
  ],
});
