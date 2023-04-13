import { SimpleGrid } from '@mantine/core';
import ChannelCard from './ChannelCard';

function ChannelList() {
  const VisibleChannels: any[] = [
    { name: 'Sala1', channelType: 'Public', password: 'aaa' },
    { name: 'Sala2', channelType: 'Private', password: 'bbb' },
    { name: 'Sala3', channelType: 'Password', password: 'ccc' },
    { name: 'Sala4', channelType: 'Public', password: 'ddd' },
  ];

  return (
    <SimpleGrid cols={1}>
      {VisibleChannels.map((c) => (
        // eslint-disable-next-line react/jsx-key
        <ChannelCard values={{ name: c.name, channelType: c.channelType, password: c.password }} />
      ))}
    </SimpleGrid>
  );
}
export default ChannelList;
