import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  github_username: String,
  password: String,
}, { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
