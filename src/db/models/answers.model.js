import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  question: Object,
  user: Object,
  body: String,
  accepted: Boolean,
  vote_count: Number,
}, { timestamps: true });

const AnswersModel = mongoose.model('Answers', AnswerSchema);

export default AnswersModel;
