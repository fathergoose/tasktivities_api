import { mongoose } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import AppUser from './Users';

const UserCollectionSchema = new Schema({
  name: { type: String, required: true },
  userCollectionId: { type: Schema.Types.ObjectId },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
}).index({ userId: 1, userCollectionId: 1 });

export default mongoose.model(
  'UserCollections',
  UserCollectionSchema,
  'userCollections',
);
