import { UserInputError } from 'apollo-server-koa';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import MessageModel, { Message } from '../models/message';
import UserModel, { User } from '../models/user';

export default {
  Query: {
    user: async (_parent: any, { username }: any): Promise<User> => {
      return (await UserModel.findOne({ username }).exec()) as User;
    },

    messages: async (_parent: any, { group_id }: { group_id: Types.ObjectId }): Promise<Message[]> => {
      const messages = await MessageModel.find({ group_id }).exec();
      return messages;
    },
  },
  Mutation: {
    createUser: async (_parent: any, { input: { username, password, avatar } }: any): Promise<User> => {
      const user = new UserModel({
        username,
        password,
        avatar,
      });
      await user.save();
      return user;
    },
    createMessage: async (
      _parent: any,
      {
        input: { sender_id, group_id, content, mentions, replyTo },
      }: {
        input: {
          sender_id: string;
          group_id: string;
          content: string;
          mentions?: string[];
          replyTo?: string;
        };
      },
    ): Promise<Message> => {
      if (!content) {
        throw new UserInputError('Message content cannot be empty');
      }
      const message = new MessageModel({
        sender_id: new ObjectId(sender_id),
        group_id: new ObjectId(group_id),
        content,
        mentions,
        replyTo,
      });
      await message.save();
      // const sender = await UserModel.findById(sender_id);
      // if (sender) {
      //   message.sender_id = new ObjectId(sender_id);
      // }
      return message;
    },
  },
};

