import { buildSchema } from 'graphql';

const schema = buildSchema(`
  scalar DateTime

  type User {
    id: String
    username: String!
    password: String
    avatar: String
    groups: [Group]
    friends: [User]
  } 

  type Group {
    id: String
    name: String!
    description: String
    ownerId: User!
    members: [User!]!
    messages: [Message]
    createdAt: DateTime
  }

  type Message {
    id: String
    sender: User!
    group: Group!
    content: String!
    sentAt: String
    mentions: [MessageMention!]!
    replyTo: [Message!]!
  }

  type MessageMention {
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
    members: [ID!]!
    messages: [ID]
  }

  input CreateMessageInput {
    senderId: ID!
    groupId: ID!
    content: String!
    sentAt: DateTime
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
    createMessageMention(input: CreateMessageMentionInput!): MessageMention!
  }

  type Query {
    user(username: String): User
    friends(username: String): [User]
    group(id: ID!): Group
    groups(userId: ID!): [Group]
    message(id: ID!): Message
    messages(groupId: ID!): [Message]
  }
`);

export default schema;

