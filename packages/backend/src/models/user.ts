import mongoose, { Document, Schema } from 'mongoose';
import { Field, ObjectType } from 'type-graphql';

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
}
export interface UserDocument extends Document {
  // id: Types.ObjectId;
  username: string;
  password: string;
  avatar: string;
}

const UserSchema = new Schema<UserDocument>({
  // id: { type: Schema.Types.ObjectId, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

export default mongoose.model<UserDocument>('User', UserSchema);

