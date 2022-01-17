import { Schema } from 'mongoose';

export default new Schema({
  name: String,
  itemType: String,
  tags: [String],
  description: String,
  date: Date,
  duration: Number,
  createdAt: Date,
});
