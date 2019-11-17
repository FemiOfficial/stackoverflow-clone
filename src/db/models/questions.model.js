import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  user: Object,
  title: String,
  tags: String,
  body: String,
  answered: Boolean,
  answer_count: Number,
  view_count: Number,
}, { timestamps: true });

const QuestionsModel = mongoose.model('Questions', QuestionSchema);

export default QuestionsModel;
