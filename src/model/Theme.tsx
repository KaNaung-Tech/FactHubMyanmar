import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Theme extends Model {
  static table = 'themes';

  @field('theme') theme!: string; // Non-null assertion for TypeScript
}
