import { FC } from 'react';
import EditChannelButton from '../components/buttons/editChannel';
import NewChannelButton from '../components/buttons/newChannel';
import ChannelCard from '../components/Channels/ChannelCard';

const Profile2: FC = () => {
  return (
    <>
      <h1>Profile Form:</h1>
      <EditChannelButton />
      <NewChannelButton />
      <ChannelCard />
      <ChannelCard />
    </>
  );
};

export default Profile2;
