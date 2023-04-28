import { Container, Flex, Overlay, ScrollArea, Text, Title, Tooltip } from '@mantine/core';
import { IconMicrophoneOff } from '@tabler/icons-react';
import { FC, useEffect, useRef, useState } from 'react';
import { IMessage } from '../../../context/ChatContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useChatContext } from '../../../hooks/useChatContext';
import MessageInput from './MessageInput';
import styles from './Messages.module.css';

// Write for me a MessageItem component, which takes an IMessage object and renders it
// as a div with a p tag inside it, which contains the message content. The style of this component should
// simulate a chat bubble, with the sender name on top and the message content below it.
// The message bubble should be on the left if the sender is the current user, and on the right if the sender is the other user.
// The message bubble should have a different background color depending on the sender.
const MessageItem: FC<IMessage> = ({ content, sender, updatedAt }) => {
  const { user } = useAuthContext();
  const isCurrentUser = user?.id === sender.id;

  return (
    <Flex align={isCurrentUser ? 'flex-end' : 'flex-start'} className={styles['chat-message']}>
      <Text className={styles['chat-message-sender']}>
        {isCurrentUser ? 'You' : sender.username}
      </Text>
      <Text
        className={styles['chat-message-content']}
        style={{
          backgroundColor: isCurrentUser ? '#F46036' : 'white',
          color: isCurrentUser ? 'white' : 'black',
        }}
      >
        {content}
      </Text>
      <Tooltip
        label={new Date(updatedAt).toLocaleTimeString([], {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
        position='bottom'
      >
        <Text className={styles['chat-message-timestamp']}>
          {new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Tooltip>
    </Flex>
  );
};

export enum DM_BLOCKED {
  BY_USER = 'user',
  BY_FRIEND = 'friend',
  NOT_BLOCKED = 'notBLocked',
}

// Defines a message component that fetches the message from the server
// and renders it.
const Messages: FC = () => {
  const viewport = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [dmBlocked, setDmBlocked] = useState(DM_BLOCKED.NOT_BLOCKED);

  const { user } = useAuthContext();
  const { activeChat, messages, isBlocked } = useChatContext();

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'auto' });
    }
  };

  useEffect(() => {
    // Auto scroll to bottom
    scrollToBottom();

    // Check if user status in active chat is muted
    setIsMuted(activeChat?.users.find((u) => u.id === user?.id)?.status === 'muted');
    if (activeChat?.type === 'direct') {
      const loggedUser = activeChat?.users.find((u) => u.id === user?.id);
      const friend = activeChat?.users.find((u) => u.id !== user?.id);
      if (loggedUser?.status == 'blocked') setDmBlocked(DM_BLOCKED.BY_FRIEND);
      else if (friend?.status == 'blocked') setDmBlocked(DM_BLOCKED.BY_USER);
      else setDmBlocked(DM_BLOCKED.NOT_BLOCKED);
    } else setDmBlocked(DM_BLOCKED.NOT_BLOCKED);
  }, [messages, activeChat]);

  return (
    <>
      <Container
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: 'rgba(67, 67, 67, 0.7)',
          height: '100%',
          width: '100%',
          borderRadius: '0 0 10px 0',
          padding: 0,
        }}
      >
        <ScrollArea
          h='85%'
          type='always'
          offsetScrollbars={true}
          className='custom-scroll-bar'
          scrollbarSize={16}
          viewportRef={viewport}
        >
          {!activeChat && (
            <Title my='20%' align='center' color='white'>
              Select a chat or create a new one
            </Title>
          )}
          {isMuted && (
            <Overlay
              opacity={0.5}
              blur={10}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
              <Flex align='center' direction='column' justify='center' style={{ height: '100%' }}>
                <Title my='lg' align='center' color='white'>
                  You are muted in this chat.
                </Title>
                <IconMicrophoneOff size={50} color='white' />
              </Flex>
            </Overlay>
          )}
          {isBlocked && (
            <Overlay
              opacity={0.5}
              blur={10}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
              <Flex align='center' direction='column' justify='center' style={{ height: '100%' }}>
                <Title my='lg' align='center' color='white'>
                  You are blocked in this chat. Input the password to see the messages.
                </Title>
              </Flex>
            </Overlay>
          )}
          {dmBlocked !== DM_BLOCKED.NOT_BLOCKED && (
            <Overlay
              opacity={0.5}
              blur={10}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
              <Flex align='center' direction='column' justify='center' style={{ height: '100%' }}>
                <Title my='lg' align='center' color='white'>
                  {dmBlocked === DM_BLOCKED.BY_USER && 'You have blocked this friend >:('}
                  {dmBlocked === DM_BLOCKED.BY_FRIEND && 'Friend has blocked you >:('}
                </Title>
              </Flex>
            </Overlay>
          )}
          {messages.map((message) => (
            <MessageItem key={message.id} {...message} />
          ))}
        </ScrollArea>
        <MessageInput />
      </Container>
    </>
  );
};

export default Messages;
