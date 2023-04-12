import { Card, Text, Badge, Group } from '@mantine/core';

function ChannelCard(props: any) {
  const channel = props.values;
  console.log('channel:', channel);

  const cardStyle = {
    backgroundColor: '#222222',
  };
  const textStyle = {
    color: 'white',
    fontWeight: 'bold',
  };

  return (
    <Card style={cardStyle} shadow='xl' padding='sm' radius='md' withBorder>
      <Group position='apart' mt='md' mb='xs'>
        <Text style={textStyle} weight={500}>
          {channel.name}
        </Text>
        <Badge color='pink' variant='filled'>
          {channel.channelType}
        </Badge>
      </Group>
    </Card>
  );
}
export default ChannelCard;
