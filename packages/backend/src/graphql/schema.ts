import { buildSchema } from 'graphql';

const schema = buildSchema(`
  scalar DateTime

  type User {
    username: String!
    password: String
    avatar: String
    groups: [Group]
  } 

  type Group {
    name: String!
    description: String
    owner: User!
    members: [User!]!
    messages: [Message!]!
  }

  type Message {
    sender: User!
    group: Group!
    content: String!
    sentAt: DateTime!
    mentions: [MessageMention!]!
    replies: [Message!]!
  }

  type MessageMention {
    message: Message!
    user: User!
    content: String!
  }

  input CreateUserInput {
    username: String!
    password: String!
    avatar: String
  }

  input CreateGroupInput {
    name: String!
    description: String!
    ownerId: ID!
  }

  input CreateMessageInput {
    senderId: ID
    groupId: ID
    content: String!
    sentAt: DateTime!
    mentions: [CreateMessageMentionInput]
    replyTo: ID
  }

  input CreateMessageMentionInput {
    userId: ID!
    content: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createGroup(input: CreateGroupInput!): Group!
    createMessage(input: CreateMessageInput!): Message!
  }

  type Query {
    user(username: String): User
    group(id: ID!): Group
    message(id: ID!): Message
    messages(groupId: ID!): [Message]
  }
`);

export default schema;

