import { Schema } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

/**
 * User Schema
 */
var UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

//mongoose.model('User', UserSchema);

export default mongoose.model('AppUser', UserSchema, 'users');
