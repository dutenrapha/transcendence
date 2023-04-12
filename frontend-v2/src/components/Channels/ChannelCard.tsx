import { Card, Text, Badge, Group } from '@mantine/core';
import { useState } from 'react';

function ChannelCard(props: any) {
  const channel = props.values;

  const [name, setName] = useState<string>(channel.name);
  const [channelType, setChannelType] = useState<string>(channel.channelType);
  const [password, setPassword] = useState<string>(channel.password);

  console.log('channel:', channel);
  console.log('pass: ', password);

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
          {name}
        </Text>
        <Badge color='pink' variant='filled'>
          {channelType}
        </Badge>
      </Group>
    </Card>
  );
}
export default ChannelCard;
