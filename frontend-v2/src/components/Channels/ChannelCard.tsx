import { Card, Text, Badge, Group } from '@mantine/core';

function ChannelCard() {
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder>
      <Group position='apart' mt='md' mb='xs'>
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color='pink' variant='light'>
          On Sale
        </Badge>
      </Group>
    </Card>
  );
}
export default ChannelCard;
