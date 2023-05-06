import { Container, Flex, Space, Stack } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FCWithLayout } from '../../App';
import GameInstructions from '../../components/Game/GameInstructions';
import GameMenuCard from '../../components/Game/GameMenuCard';
import Matchmaker from '../../components/Game/Matchmaker';
import { IMatch } from '../../context/GameContext';
import { useSocket } from '../../hooks/socket';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './Game.module.css';

const MatchmakerPage: FCWithLayout = () => {
  const { user } = useAuthContext();
  const { socket, updateSocketUserStatus } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) updateSocketUserStatus('online');
  }, [socket]);

  return (
    <Container className={styles['container']}>
      <Stack
        styles={{
          marginTop: '10%',
        }}
      >
        <Flex align='center' justify='space-around'>
          <GameMenuCard
            onClick={() => {
              socket?.emit('createGame', { playerOne: user?.id }, (match: IMatch) => {
                navigate(`/game/${match.id}`);
              });
            }}
          >
            Create a new game room
          </GameMenuCard>
          <Space w={12} />
          <GameMenuCard>Join a random game room</GameMenuCard>
        </Flex>
        <Matchmaker />
      </Stack>
      <GameInstructions />
    </Container>
  );
};

export default MatchmakerPage;
