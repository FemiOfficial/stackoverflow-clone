import mongoose from 'mongoose';

const VoteSchema = new mongoose.Schema({
  user: Object,
  answer: Object,
  vote: Number,
}, { timestamps: true });
const VotesModel = mongoose.model('Votes', VoteSchema);

export default VotesModel;
