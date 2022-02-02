import { Schema } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    tags: { type: [String], trim: true, lowercase: true, index: true },
    description: String,
    itemDate: Date,
    duration: Number,
    state: { type: String, required: true },
  },
  { timestamps: true },
)

export default mongoose.model('Items', ItemSchema);
