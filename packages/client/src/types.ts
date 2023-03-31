export interface UserDocument {
  id?: string;
  username: string;
  password?: string;
  avatar?: string;
  friends?: UserDocument[];
}

export interface MessageDocument {
  id: string;
  sender: UserDocument;
  group: UserDocument;
  content: string;
  sentAt?: Date;
  replyTo?: MessageDocument[];
  mentions?: MessageMentionDocument[];
}

export interface GroupDocument {
  id: string;
  name: string;
  description?: string;
  ownerId: UserDocument;
  createdAt: Date;
  members?: UserDocument[];
  messages?: MessageDocument[];
}

export interface MessageMentionDocument {
  // id: Types.ObjectId;
  message: string;
  user: UserDocument;
  content: string;
}

