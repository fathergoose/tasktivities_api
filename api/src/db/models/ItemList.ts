import { mongoose } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import AppUser from './Users';
import UserCollection from './UserCollection';

const ItemListSchema = new Schema({
  name: { type: String, required: true },
  userCollection: { type: UserCollection, index: true },
  user: { type: AppUser, index: true },
});

export default mongoose.model('ItemLists', ItemListSchema);
