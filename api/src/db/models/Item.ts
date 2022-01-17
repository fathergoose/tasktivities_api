import { mongoose } from '@typegoose/typegoose';
import ItemSchema from '../schema/ItemSchema';
import { Tag } from './Tag';

export type Item = {
  id: string;
  name: string;
  itemType?: string;
  tags: string[];
  description?: string;
  date?: Date;
  duration?: number;
  createdAt: Date;
};

export type CreateItemInput = {
  name: string;
  description: string;
  tags: Pick<Tag, 'name'>[];
};

export default mongoose.model('Items', ItemSchema);
