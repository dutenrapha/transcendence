import { Card, Text, Badge, Group } from '@mantine/core';

function ChannelCard(props: any) {
  const channel = props.values;
  console.log('channel:', channel);

  return (
    <Card shadow='xl' padding='sm' radius='md' withBorder>
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>{channel.name}</Text>
        <Badge color='pink' variant='light'>
          {channel.channelType}
        </Badge>
      </Group>
    </Card>
  );
}
export default ChannelCard;
