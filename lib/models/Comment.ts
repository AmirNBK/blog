import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  date: Date;
}

const CommentSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
