import { mongoose } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

const ItemListSchema = new Schema({
  name: { type: String, required: true },
  userCollectionId: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
  },
  items: { type: [Schema.Types.ObjectId], ref: 'Items' },
}).index({ userCollectionId: 1 });

export default mongoose.model('ItemLists', ItemListSchema, 'itemLists');
