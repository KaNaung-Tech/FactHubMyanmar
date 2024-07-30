import { Model } from '@nozbe/watermelondb'
import { field} from '@nozbe/watermelondb/decorators'

class Category extends Model {
  static table = 'categories'

  @field('name') name!: string;
  @field('count') count!: number;
}

export default Category
