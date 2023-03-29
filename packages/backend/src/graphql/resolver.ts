import { UserInputError } from 'apollo-server-koa';
import { Types } from 'mongoose';
import { Args, Mutation, Query, Resolver } from 'type-graphql';
import MessageModel, { Message } from '../models/message';
import UserModel from '../models/user';

@Resolver(Message)
export class MessageResolver {
  @Query(() => [Message])
  async messages(@Args() { group_id }: { group_id: Types.ObjectId }): Promise<Message[]> {
    const messages = await MessageModel.find({ group_id }).populate('sender_id').exec();
    return messages;
  }

  @Mutation(() => Message)
  async createMessage(
    @Args() { sender_id }: { sender_id: Types.ObjectId },
    @Args() { group_id }: { group_id: Types.ObjectId },
    @Args() { content }: { content: Types.ObjectId },
    @Args() { mentions }: { mentions?: string[] } = {},
    @Args() { reply_to }: { reply_to?: string } = {},
  ): Promise<Message> {
    if (!content) {
      throw new UserInputError('Message content cannot be empty');
    }
    const message = new MessageModel({
      sender_id,
      group_id,
      content,
      mentions,
      reply_to,
    });
    await message.save();
    const sender = await UserModel.findById(sender_id);
    if (sender) {
      message.sender_id = sender_id;
    }
    return message;
  }
}

