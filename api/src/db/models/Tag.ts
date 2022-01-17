import { mongoose } from '@typegoose/typegoose';
import TagSchema from '../schema/TagSchema';

export type Tag = {
  id: string;
  name: string;
};

export type CreateTagInput = {
  name: string;
};

export default mongoose.model('Tags', TagSchema);
