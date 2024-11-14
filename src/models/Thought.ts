import { Schema, model, Document, Types } from 'mongoose';
import Reaction from './Reaction';

// Thought interface
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  userId: Types.ObjectId;
  reactions: any[];
  reactionCount: number;
}

// Thought Schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reactions: [Reaction],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function (this: any) {
  return this.reactions.length;
});

// Thought model exporting
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
