import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class MessageMention {
  // @Field(() => ID)
  // id!: string;

  @Field(() => ID)
  messageId?: Types.ObjectId;

  @Field(() => ID)
  userId!: Types.ObjectId;

  @Field()
  content?: string;
}
export interface MessageMentionDocument extends Document {
  // id: Types.ObjectId;
  messageId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
}

const MessageMentionSchema = new Schema<MessageMentionDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String },
});

export default mongoose.model<MessageMentionDocument>('MessageMentions', MessageMentionSchema);

