import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('title') title!: string;
  @field('content') content!: string;
  @date('date') date!: number;
  @field('author') author!: string;
}
