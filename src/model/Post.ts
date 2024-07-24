import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('title') title!: string;
  @field('content') content!: string;
  @date('published_at') publishedAt!: number;
  @date('date') date!: number;
  @field('categories') categories!: string;
  @field('author_name') authorName!: string;
  @field('featured_media_url') featuredMediaUrl!:string;
}
