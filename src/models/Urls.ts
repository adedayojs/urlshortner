import shortid from 'shortid';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  shortId: string;
}
const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortId: { type: String, required: true, default: shortid.generate() },
});

export default mongoose.model<IUrl>('url', UrlSchema);
