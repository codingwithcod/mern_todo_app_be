import mongoose, { Document } from 'mongoose';

interface IBaseUser {
  fullName: string;
  email: string;
  password: string;
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new mongoose.Schema<IUserSchema>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model<IUserSchema>('user', userSchema);

export default userModel;
