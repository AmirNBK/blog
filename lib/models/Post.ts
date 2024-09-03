import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    summary: string;
    content: string;
    publishDate: Date;
    author: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
