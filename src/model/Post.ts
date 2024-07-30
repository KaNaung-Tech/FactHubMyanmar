import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts';

  @field('post_id') post!: string; 
  @field('title') title!: string;
  @field('content') content!: string;
  @date('published_at') publishedAt!: number;
  @date('date') date!: number;
  @field('categories') categories!: string;
  @field('author_name') authorName!: string;
  @field('featured_media_url') featuredMediaUrl!:string;
  @field('details_title') detailsTitle!: string;  // New field
  @field('author_avatar_url') authorAvatarUrl!: string; // New field
}
