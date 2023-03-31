import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Group {
  // @Field(() => ID)
  // id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  ownerId!: Types.ObjectId;

  @Field()
  createdAt!: Date;
  @Field(() => ID)
  members!: Types.ObjectId[];
  @Field(() => ID)
  messages?: Types.ObjectId[];
}
export interface GroupDocument extends Document {
  // id: Types.ObjectId;
  name: string;
  description: string;
  ownerId: Types.ObjectId;
  createdAt: Date;
  members: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const GroupSchema = new Schema<GroupDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  members: { type: [Schema.Types.ObjectId], default: [], required: true },
  messages: { type: [Schema.Types.ObjectId], default: [] },
});

export default mongoose.model<GroupDocument>('Group', GroupSchema);

