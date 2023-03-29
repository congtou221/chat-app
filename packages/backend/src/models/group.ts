import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Group {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => ID)
  owner_id!: string;

  @Field()
  created_at!: Date;
}
export interface GroupDocument extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;
  owner_id: Types.ObjectId;
  created_at: Date;
}

const GroupSchema = new Schema<GroupDocument>({
  id: { type: Schema.Types.ObjectId, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  owner_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<GroupDocument>('Group', GroupSchema);

