import { Schema } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';
import AppUser from './Users';
import { ObjectId } from 'mongodb';

const ItemSchema = new Schema(
  {
    itemListId: { type: ObjectId, required: true },
    userId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    itemType: { type: String, required: true },
    tags: { type: [String], trim: true, lowercase: true },
    pending: { type: Boolean, required: true },
    description: String,
    itemDate: Date,
    duration: Number,
  },
  { timestamps: true },
)
  .index({ userId: 1, tags: 1 })
  .index({ userId: 1, itemType: 1 });

export default mongoose.model('Items', ItemSchema);
