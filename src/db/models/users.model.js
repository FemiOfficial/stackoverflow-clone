import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  githubUsername: String,
  password: String,
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
