import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  question: Object,
  user: Object,
  body: String,
  accepted: {
    type: Boolean,
    default: false,
  },
  vote_count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const AnswersModel = mongoose.model('Answers', AnswerSchema);

export default AnswersModel;
