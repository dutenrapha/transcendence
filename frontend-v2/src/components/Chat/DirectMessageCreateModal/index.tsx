import {
  Card,
  Flex,
  LoadingOverlay,
  Title,
  Text,
  Badge,
  Avatar,
  TextInput,
  Button,
  Tooltip,
  Indicator,
} from '@mantine/core';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { alert, success } from '../../Notifications';
import { Link } from 'react-router-dom';
import styles from './DirectMessageCreateModal.module.css';
import { IUser } from '../../../context/AuthContext';
import { IconMoodPlus, IconSearch, IconSend, IconUsers } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useSocket } from '../../../hooks/socket';
import { useChatContext } from '../../../hooks/useChatContext';

export interface IFriendRequest {
  id: number;
  accepted_date: boolean | null;
  status: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
  sender: IUser;
  recipient: IUser;
}

interface SocketUser extends IUser {
  status: 'online' | 'offline' | 'game' | 'chat';
}

interface IDMModalProps {
  close(): void;
}

const DirectMessageCreateModal: FC<IDMModalProps> = ({ close }) => {
  const { user } = useAuthContext();
  const { socketUsersList } = useSocket();
  const { createDirectMessage } = useChatContext();
  const notificationTitle = 'Direct Message';
  const [friendsList, setFriendsList] = useState([] as IUser[]);
  const [filteredFriendsList, setFilteredFriendsList] = useState([] as IUser[]);
  const [isLoading, setIsLoading] = useState(false);
  const [friendSearched, setFriendSearched] = useState('');

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    api
      .get(`/friends/${user?.id}`)
      .then(({ data }) => {
        setFriendsList(data);
        setFilteredFriendsList(data);

        success('Successfully fetched user data', notificationTitle);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          alert(err.response?.data.message, notificationTitle);
        } else {
          alert('Error occured while fetching friends list', notificationTitle);
        }
      })
      .finally(() => setIsLoading(false));
  }, [user?.id]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const seachInputValue = event.currentTarget.value
        ? String(event.currentTarget.value).toLowerCase()
        : event.currentTarget.value;
      setFriendSearched(event.currentTarget.value);
      setFilteredFriendsList(
        !seachInputValue
          ? friendsList
          : friendsList.filter(({ firstName, lastName, username }) => {
              const name = `${firstName} ${lastName}`.toLowerCase();

              return name.includes(seachInputValue) || username.includes(seachInputValue);
            }),
      );
    },
    [friendsList],
  );

  const emitCreateDM = useCallback(
    async (friendId: number) => {
      createDirectMessage(friendId);
      close();
    },
    [createDirectMessage],
  );

  const getStatusColor = useCallback((color: string) => {
    switch (color) {
      case 'online':
        return 'green';
      case 'offline':
        return 'red';
      case 'game':
        return 'secondary';
      case 'chat':
        return 'yellow';
      default:
        return 'red';
    }
  }, []);

  return (
    <Card shadow='xl' px={20} p={16} h={400} style={{ position: 'relative' }}>
      <LoadingOverlay
        loaderProps={{ color: 'secondary', variant: 'bars' }}
        overlayOpacity={0.2}
        visible={isLoading}
        overlayBlur={1}
      />

      <TextInput
        px={8}
        mb={12}
        className={styles['search-input']}
        icon={<IconSearch size='0.8rem' />}
        placeholder='search friends'
        value={friendSearched}
        onChange={handleSearch}
      />
      <Flex
        className='custom-scroll-bar'
        direction='column'
        align='center'
        mb={24}
        px={8}
        h='85%'
        style={{ overflow: 'auto' }}
      >
        {filteredFriendsList.map((friend) => (
          <Card
            key={friend.id}
            my={6}
            px={10}
            radius={8}
            w='100%'
            mih={69}
            className={styles['friend-card']}
          >
            <Flex align='center'>
              <Link className={styles['link']} to={`/profile/${friend.id}`}>
                <Avatar
                  radius='50%'
                  size={48}
                  mr={20}
                  className={styles['friend-avatar']}
                  src={friend.avatarUrl || '/images/cat-pirate.jpg'}
                  alt='friend avatar'
                />
              </Link>

              <Flex direction='column'>
                <Title color='white' order={4}>
                  {friend.firstName}
                </Title>
                <Text w={140} italic size='0.7rem' color='grey' truncate>
                  {friend.username}
                </Text>
              </Flex>
            </Flex>
            <Flex align='center'>
              <Badge variant='dot' color={getStatusColor(socketUsersList[friend.id]?.status)}>
                {socketUsersList[friend.id]?.status || 'offline'}
              </Badge>
              <Button onClick={() => emitCreateDM(friend.id)} radius={8} color='secondary' ml={16}>
                <IconSend size='1rem' />
              </Button>
            </Flex>
          </Card>
        ))}

        {!filteredFriendsList.length && (
          <Text m={24} color='white'>
            No friends :(
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default DirectMessageCreateModal;