import { SimpleGrid } from '@mantine/core';
import ChannelCard from './ChannelCard';

function ChannelList() {
  const VisibleChannels: any[] = [
    { name: 'Sala1', channelType: 'Public' },
    { name: 'Sala2', channelType: 'Private' },
    { name: 'Sala3', channelType: 'Password' },
    { name: 'Sala4', channelType: 'Public' },
  ];

  return (
    <SimpleGrid cols={1}>
      {VisibleChannels.map((c) => (
        // eslint-disable-next-line react/jsx-key
        <ChannelCard values={{ name: c.name, channelType: c.channelType }} />
      ))}
    </SimpleGrid>
  );
}
export default ChannelList;
