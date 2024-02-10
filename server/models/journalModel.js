const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aiAnalysisSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  analysisResult: String
}, { _id: false });

const pageSchema = new Schema({
  pageId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  date: { type: Date, default: Date.now },
  text: String,
  aiAnalysis: aiAnalysisSchema
}, { _id: false }); 

const journalSchema = new Schema({
  title: String,
  shortDescription: String,
  date: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false }, 
  pages: [pageSchema]
});

const Journal = mongoose.model('Journal', journalSchema);