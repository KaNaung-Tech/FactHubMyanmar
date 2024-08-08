import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

class OnboardingSelection extends Model {
  static table = 'onboarding_selections';

  @field('category_name') categoryName!: string;;
  @date('created_at') createdAt!: string;
  @field('category_id') categoryId!: string;
}

export default OnboardingSelection;
