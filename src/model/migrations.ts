import { addColumns, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';

const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'posts',
          columns: [
            { name: 'post_id', type: 'string' },
          ],
        }),
      ],
    },
  ],
});
export default migrations;
