import { UserInputError } from 'apollo-server-koa';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import GroupModel, { Group } from '../models/group';
import MessageModel, { Message } from '../models/message';
import MessageMentionModel, { MessageMention } from '../models/message_mention';
import UserModel, { User } from '../models/user';

interface IMessageModel extends Message {
  _id: string;
}
export const getMessageObjList = async (messages: IMessageModel[]): Promise<any[]> => {
  const newMessages = messages.map(async (message) => {
    const { _id: id, content, mentions, replyTo, senderId, sentAt, groupId } = message;
    const ownerPromise: Promise<User> = new Promise((resolve) => {
      UserModel.findById(new ObjectId(senderId))
        .exec()
        .then((v) => resolve(v as User));
    });
    const replyToPromise: Promise<Message[]> = new Promise((resolve) => {
      MessageModel.find({ _id: { $in: replyTo } })
        .exec()
        .then((v) => resolve(v as Message[]));
    });
    const mentionsPromise: Promise<MessageMention[]> = new Promise((resolve) => {
      MessageMentionModel.find({ _id: { $in: mentions } })
        .exec()
        .then((v) => {
          resolve(v as MessageMention[]);
        });
    });
    const [senderObj, replyMessages, mentionsObjList] = await Promise.all([
      ownerPromise,
      replyToPromise,
      mentionsPromise,
    ]);
    const newMentionsObj = mentionsObjList.map(async (mentionsObj) => {
      const { content, userId } = mentionsObj;
      const userPromise: Promise<User> = new Promise((resolve) => {
        UserModel.findById(new ObjectId(userId))
          .exec()
          .then((v) => resolve(v as User));
      });
      const user = await userPromise;
      return {
        content,
        user,
      };
    });
    return {
      id,
      groupId,
      content,
      sender: senderObj,
      replyTo: replyMessages,
      mentions: await Promise.all(newMentionsObj),
      sentAt,
    };
  });
  return await Promise.all(newMessages);
};
export default {
  Query: {
    user: async (_parent: any, { username }: any): Promise<User> => {
      return (await UserModel.findOne({ username }).exec()) as User;
    },

    friends: async (_parent: any, { username }: any): Promise<any[]> => {
      const { friends = [] } = (await UserModel.findOne({ username }).exec()) as User;
      const newFriends = friends.map(async (friendId) => {
        const { username, _id, friends, avatar } = (await UserModel.findOne({ _id: friendId }).exec()) || {};
        return {
          username,
          friends,
          avatar,
          id: _id,
        };
      });
      return await Promise.all(newFriends);
    },

    messages: async (_parent: any, { groupId }: { groupId: Types.ObjectId }): Promise<any[]> => {
      const messages = await MessageModel.find({ groupId }).exec();
      return await getMessageObjList(messages);
    },

    groups: async (_parent: any, { userId }: { userId: string }): Promise<any[]> => {
      const groups = await GroupModel.find({ members: { $in: [new ObjectId(userId)] } }).exec();
      const newGroup = groups.map(async (group) => {
        const { _id, id, members: memberIds, messages: messageIds, name, description, ownerId, createdAt } = group;
        const ownerPromise: Promise<User> = new Promise((resolve) => {
          UserModel.findOne({ _id: ownerId })
            .exec()
            .then((v) => resolve(v as User));
        });
        const memberPromise: Promise<User[]> = new Promise((resolve) => {
          UserModel.find({ _id: { $in: memberIds } })
            .exec()
            .then((v) => resolve(v as User[]));
        });
        const messagePromise: Promise<IMessageModel[]> = new Promise((resolve) => {
          MessageModel.find({ _id: { $in: messageIds } })
            .exec()
            .then((v) => resolve(v as IMessageModel[]));
        });

        const [owner, matchedMembers, matchedMesssages] = await Promise.all([
          ownerPromise,
          memberPromise,
          messagePromise,
        ]);

        return {
          id,
          members: matchedMembers,
          messages: await getMessageObjList(matchedMesssages),
          ownerId: owner,
          name,
          description,
          createdAt,
        };
      });
      return await Promise.all(newGroup);
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
        input: { senderId, groupId, content, mentions, replyTo },
      }: {
        input: {
          senderId: string;
          groupId: string;
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
        senderId: new ObjectId(senderId),
        groupId: new ObjectId(groupId),
        content,
        mentions,
        replyTo,
      });
      await message.save();
      return message;
    },
    createGroup: async (
      _parent: any,
      {
        input: { name, description, owner_id, members, messages },
      }: {
        input: {
          name: string;
          description: string;
          owner_id: string;
          members: string[];
          messages: string[];
        };
      },
    ): Promise<Group> => {
      const group = new GroupModel({
        name,
        description,
        owner_id: new ObjectId(owner_id),
        members: members.map((m) => new ObjectId(m)),
        messages: messages.map((m) => new ObjectId(m)),
      });
      await group.save();
      return group;
    },
    createMessageMention: async (
      _parent: any,
      {
        input: { userId, content },
      }: {
        input: {
          userId: string;
          content: string;
        };
      },
    ): Promise<MessageMention> => {
      const messageMention = new MessageMentionModel({
        userId: new ObjectId(userId),
        content,
      });
      await messageMention.save();
      return messageMention;
    },
  },
};

