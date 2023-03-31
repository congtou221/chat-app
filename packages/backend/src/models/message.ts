import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Message {
  // @Field(() => ID)
  // id!: Types.ObjectId;
  @Field(() => ID)
  senderId!: Types.ObjectId;
  @Field(() => ID)
  groupId!: Types.ObjectId;
  @Field()
  content!: string;
  @Field()
  sentAt!: Date;
  @Field(() => ID, { nullable: true })
  replyTo?: Types.ObjectId;
  @Field(() => ID, { nullable: true })
  mentions?: Types.ObjectId;
}

export interface MessageDocument extends Document {
  // id: Types.ObjectId;
  senderId: Types.ObjectId;
  groupId: Types.ObjectId;
  content: string;
  sentAt: Date;
  replyTo?: Types.ObjectId;
  mentions?: Types.ObjectId;
}

const MessageSchema = new Schema<MessageDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  senderId: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  groupId: { type: Schema.Types.ObjectId, required: false, ref: 'Group' },
  content: { type: String },
  sentAt: { type: Date, default: Date.now },
  replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
  mentions: { type: Schema.Types.ObjectId, ref: 'MessageMention' },
});

export default mongoose.model<MessageDocument>('Message', MessageSchema);

