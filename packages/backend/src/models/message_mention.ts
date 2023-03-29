import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class MessageMention {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  message_id!: string;

  @Field(() => ID)
  user_id!: string;

  @Field()
  content!: string;
}
export interface MessageMentionDocument extends Document {
  id: Types.ObjectId;
  message_id: Types.ObjectId;
  user_id: Types.ObjectId;
  content: string;
}

const MessageMentionSchema = new Schema<MessageMentionDocument>({
  id: { type: Schema.Types.ObjectId, required: true, unique: true },
  message_id: { type: Schema.Types.ObjectId, required: true, ref: 'Message' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String },
});

export default mongoose.model<MessageMentionDocument>('MessageMention', MessageMentionSchema);

