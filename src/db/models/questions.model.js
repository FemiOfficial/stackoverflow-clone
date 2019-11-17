import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  user: Object,
  title: String,
  tags: Array,
  body: String,
  answered: {
    type: Boolean,
    default: false,
  },
  answer_count: {
    type: Number,
    default: 0,
  },
  view_count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const QuestionsModel = mongoose.model('Questions', QuestionSchema);

export default QuestionsModel;
