import { Schema } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';

const ItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
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
