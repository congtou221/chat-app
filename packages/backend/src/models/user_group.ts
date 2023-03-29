import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserGroup {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  user_id!: string;

  @Field(() => ID)
  group_id!: string;
}
export interface UserGroupDocument extends Document {
  id: Types.ObjectId;
  user_id: Types.ObjectId;
  group_id: Types.ObjectId;
}

const UserGroupSchema = new Schema<UserGroupDocument>({
  id: { type: Schema.Types.ObjectId, required: true, unique: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  group_id: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

export default mongoose.model<UserGroupDocument>('UserGroup', UserGroupSchema);

