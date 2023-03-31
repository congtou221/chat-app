import { Layout, theme } from 'antd';
import UserInfo, { IUserInfoProps } from './UserInfo';

const { Header } = Layout;

const HeaderBar = (props: IUserInfoProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div style={{ float: 'right', margin: '0 20px' }}>
        <UserInfo user={props.user} />
      </div>
    </Header>
  );
};

export default HeaderBar;

