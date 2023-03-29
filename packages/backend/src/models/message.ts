import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Message {
  // @Field(() => ID)
  // id!: Types.ObjectId;
  @Field(() => ID)
  sender_id!: Types.ObjectId;
  @Field(() => ID)
  group_id!: Types.ObjectId;
  @Field()
  content!: string;
  @Field()
  sent_at!: Date;
  @Field(() => ID, { nullable: true })
  reply_to?: Types.ObjectId;
}

export interface MessageDocument extends Document {
  // id: Types.ObjectId;
  sender_id: Types.ObjectId;
  group_id: Types.ObjectId;
  content: string;
  sent_at: Date;
  reply_to?: Types.ObjectId;
}

const MessageSchema = new Schema<MessageDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  sender_id: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  group_id: { type: Schema.Types.ObjectId, required: false, ref: 'Group' },
  content: { type: String, required: true },
  sent_at: { type: Date, default: Date.now },
  reply_to: { type: Schema.Types.ObjectId, ref: 'Message' },
});

export default mongoose.model<MessageDocument>('Message', MessageSchema);

