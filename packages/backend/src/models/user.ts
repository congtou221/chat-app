import mongoose, { Document, Schema, Types } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  // @Field(() => ID)
  // id?: string;
  @Field()
  username?: string;

  @Field()
  password?: string;

  @Field({ nullable: true })
  avatar?: string;
  @Field(() => ID)
  friends?: Types.ObjectId[];
}
export interface UserDocument extends Document {
  // id: Types.ObjectId;
  username: string;
  password: string;
  avatar: string;
  friends: Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  friends: { type: [Schema.Types.ObjectId], default: [] },
});

export default mongoose.model<UserDocument>('User', UserSchema);

