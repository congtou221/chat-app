import { Layout } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import HeaderBar from './Header';
import MessageBox from './MessageBox';
import SideBar from './Sidebar';
import { GroupDocument } from './types';
import { getCookie } from './utils/cookie';
import graphqlPost from './utils/graphqlPost';

// import logo from './logo.svg';
// import UserInfo from './UserInfo';
export const socket = io('http://localhost:3000');
// export const userId = '6423f4f23990a93bd29e0b8c';
export const userId = getCookie('uid') || '6423f4f23990a93bd29e0b8c';
export const username = getCookie('uname') || '测试用户1';
// export const username = '测试用户1';
function App() {
  const query = `query {
    groups(userId: "${userId}") {
      id
      name
      description
      members {
        username
        avatar
        password
      }
      messages {
        id
        content
        sentAt
        sender {
          username
          avatar
        }
        mentions {
          content
          user {
            username
          }
        }
        replyTo {
          content
        }
      }
      ownerId {
        username
        avatar
      }
      createdAt
    }
    friends(username: "${username}") {
      id
      username
      password
    }
    user(username: "${username}") {
      avatar
      username
    }
  }`;
  const [groups, setGroups] = useState<GroupDocument[]>([]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({ username: '' });
  const [updatedGroupIds, setUpdatedGroupIds] = useState<string[]>([]);

  const removeUpdatedGroupIds = useCallback(
    (groupId: string) => {
      if (updatedGroupIds.includes(groupId)) {
        const index = updatedGroupIds.indexOf(groupId);
        updatedGroupIds.splice(index, 1);
        setUpdatedGroupIds([...updatedGroupIds]);
      }
      return updatedGroupIds;
    },
    [updatedGroupIds],
  );
  const createSocketConnection = (groups: GroupDocument[]) => {
    socket.on('connect', () => {
      console.log('Client: Socket.IO connection established');
      // socket.send('Hello Server!');
    });

    socket.on('message', (data) => {
      console.log('Client received: ' + JSON.stringify(data));
      const { groupId, sender, content, mentions, replyTo } = data;
      if (sender.id !== userId) {
        if (!updatedGroupIds?.includes(groupId)) {
          setUpdatedGroupIds([...updatedGroupIds, groupId]);
        }
      }
      const newGroups =
        groups.map((group) => {
          const { id, messages = [] } = group;
          const newOneGroup = JSON.parse(JSON.stringify(group));
          if (id === groupId) {
            newOneGroup.messages = [...messages, data];
          }
          return newOneGroup;
        }) || {};
      setGroups(newGroups);
    });

    socket.on('disconnect', () => {
      console.log('Client: Socket.IO connection closed');
    });
  };
  useEffect(() => {
    graphqlPost(
      { query },
      (data) => {
        const { friends, groups, user } = data as any;
        setFriends(friends);
        setGroups(groups);
        setUser(user);
        createSocketConnection(groups || []);
      },
      (e) => {
        console.error(e);
      },
    );
  }, [query]);

  return (
    <Layout style={{ height: '100%' }}>
      <SideBar
        friends={friends}
        groups={groups}
        updatedGroupIds={updatedGroupIds}
        removeUpdatedGroupIds={removeUpdatedGroupIds}
      />
      <Layout>
        <HeaderBar user={user} />
        <MessageBox groups={groups} friends={friends} />
      </Layout>
    </Layout>
  );
}

export default App;

