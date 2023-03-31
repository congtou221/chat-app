import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { FC } from 'react';
import { UserDocument } from './types';
import './UserInfo.css';

export interface IUserInfoProps {
  user: UserDocument;
}

const UserInfo: FC<IUserInfoProps> = (props) => {
  const userInfo = props.user;
  return (
    <Space size={24}>
      <Avatar shape='square' icon={<UserOutlined />} src={userInfo?.avatar} />
      {userInfo?.username}
    </Space>
  );
};

export default UserInfo;

