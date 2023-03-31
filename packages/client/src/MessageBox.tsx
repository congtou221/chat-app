import type { InputRef } from 'antd';
import { Button, Col, Input, Layout, message, Row, Select, theme } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { socket, userId } from './App';
import './MessageBox.css';
import { GroupDocument, MessageDocument, UserDocument } from './types';
import { getHashes } from './utils/url';

const { Content, Footer } = Layout;

interface IMessageBoxProps {
  groups: GroupDocument[];
  friends: UserDocument[];
}

const MessageBox = (props: IMessageBoxProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [groupId, setGroupId] = useState(getHashes().groupid);
  const { groups, friends } = props;
  const { messages = [] } = groups.find((g) => g.id === groupId) || {};
  const [editing, setEditing] = useState<string>('');
  const [replyMsgId, setReplyMsgId] = useState<string>('');
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [mention, setMention] = useState<string>();
  const textRef = useRef<InputRef>(null);

  window.addEventListener(
    'hashchange',
    function () {
      const { groupid } = getHashes();
      setGroupId(groupid);
    },
    false,
  );
  const editMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditing(e?.target?.value);
  };
  const sendMessage = (): void => {
    if (!socket.connected) {
      message.warning('服务异常，请刷新重试');
      return;
    }
    socket.emit('message', {
      content: editing.replace(/^(.*)\n--------------------\n/, ''),
      groupId: groupId,
      senderId: userId,
      replyTo: replyMsgId ? [replyMsgId] : undefined,
      mentions: mention ? [mention] : undefined,
    });
    setEditing('');
  };
  const reply = (id: string, content: string) => {
    setEditing(`"${content}"\n--------------------\n`);
    setReplyMsgId(id);
    textRef.current?.focus();
  };
  return (
    <>
      <Content style={{ margin: '24px 16px 0', overflow: 'scroll' }}>
        <div style={{ padding: 24, height: '100%', background: colorBgContainer }}>
          {messages.map(
            ({ id, content, sender, sentAt, mentions = [], replyTo = [] }: MessageDocument, index: number) => (
              <div className='message-container' data-msgid={id} key={index}>
                <div className='message-reply'>
                  {replyTo?.length > 0 ? `“${replyTo?.map(({ content }) => content).join()}”` : ''}
                </div>
                <img className='message-avatar' src={sender?.avatar} alt='' />
                <span className='message-main'>
                  <span className='message-context'>
                    {content}
                    <span>
                      {mentions?.length > 0
                        ? mentions
                            ?.map(({ user: mentionedUser, content: mentionedContent }) => {
                              return `@${mentionedUser?.username} ${mentionedContent}`;
                            })
                            .join(' ')
                        : ''}
                    </span>
                  </span>
                  <span className='message-time'>
                    {dayjs(Number.isNaN(Number(sentAt)) ? sentAt : Number(sentAt)).format('YYYY-MM-DD hh:mm:ss')}
                  </span>
                </span>
                <Button type='text' onClick={() => reply(id, content)}>
                  回复
                </Button>
              </div>
            ),
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Row>
          <Button onClick={() => setShowFriends(!showFriends)}>@</Button>
          {showFriends && (
            <Select
              style={{ width: 120 }}
              onChange={(v) => setMention(v)}
              options={friends.map(({ username, id }) => ({ label: username, value: id }))}
            />
          )}
        </Row>
        <Row>
          <Col flex='auto'>
            <Input.TextArea onChange={editMessage} value={editing} ref={textRef} />
          </Col>
          <Col flex='100px'>
            <Button onClick={sendMessage}>发送</Button>
          </Col>
        </Row>
      </Footer>
    </>
  );
};

export default MessageBox;

