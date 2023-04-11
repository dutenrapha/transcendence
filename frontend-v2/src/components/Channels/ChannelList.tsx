import { SimpleGrid } from '@mantine/core';
import ChannelCard from './ChannelCard';

function ChannelList() {
  return (
    <SimpleGrid cols={1}>
      <ChannelCard />
      <ChannelCard />
      <ChannelCard />
    </SimpleGrid>
  );
}
export default ChannelList;
