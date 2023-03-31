import { CommentOutlined, MessageOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Layout, Menu, MenuProps } from 'antd';
import './Sidebar.css';
import { GroupDocument, UserDocument } from './types';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
interface ISidebarProps {
  groups: GroupDocument[];
  friends: UserDocument[];
  updatedGroupIds: string[];
  removeUpdatedGroupIds: (groupId: string) => void;
}

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void,
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
};

const SideBar = (props: ISidebarProps) => {
  const { groups = [], friends, updatedGroupIds, removeUpdatedGroupIds } = props;
  const items: MenuItem[] = [
    getItem(
      'Chat',
      'Chat',
      // <MessageOutlined />,
      <Badge>
        <Avatar shape='square' icon={<MessageOutlined />} />
      </Badge>,
      groups.map(({ name, id }, index) =>
        getItem(
          name,
          id,
          <Badge count={updatedGroupIds?.includes(id) ? 1 : 0} dot={updatedGroupIds?.includes(id)} size={'small'}>
            <Avatar shape='square' icon={<CommentOutlined />} />
          </Badge>,
          undefined,
          () => {
            window.location.hash = `groupid=${id}`;
            removeUpdatedGroupIds(id);
          },
        ),
      ),
    ),
    getItem(
      'Members',
      'Members',
      <Badge count={1} dot={true}>
        <Avatar shape='square' icon={<TeamOutlined />} />
      </Badge>,
      friends.map(({ username }, index) => getItem(username, `user${index}`, <UserOutlined />)),
    ),
  ];
  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className='logo' />
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['Chat']} items={items} />
    </Sider>
  );
};

export default SideBar;

