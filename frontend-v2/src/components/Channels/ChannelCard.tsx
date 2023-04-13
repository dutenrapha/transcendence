import { Card, Text, Badge, Group, Modal, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { FC, useState } from 'react';

function ChannelCard(props: any) {
  const channel = props.values;

  const [name, setName] = useState<string>(channel.name);
  const [channelType, setChannelType] = useState<string>(channel.channelType);
  const [password, setPassword] = useState<string>(channel.password);
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState(null);

  console.log('channel:', channel);
  //  console.log('pass: ', password);

  const cardStyle = {
    backgroundColor: '#222222',
  };

  const textStyle = {
    color: 'white',
    fontWeight: 'bold',
  };

  const ProcessCardClick = () => {
    if (channelType != 'Password') alert('Wellcome to chat !!');
    else open();
  };

  const PasswordForm: FC = () => {
    const handleSubmit = (values: { password: string }) => {
      console.log('values: ', values);
      if (values.password == password) alert('Bem vindo ao chat !');
      else alert('Senha incorreta');
    };

    const form = useForm<{ password: string }>({
      initialValues: {
        password: '',
      },
    });

    return (
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <PasswordInput
          label='Password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
        />
        <Button type='submit'>Enter</Button>
      </form>
    );
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title='Please enter channel password'>
        <PasswordForm />
      </Modal>
      <Card
        style={cardStyle}
        onClick={ProcessCardClick}
        shadow='xl'
        padding='sm'
        radius='md'
        withBorder
      >
        <Group position='apart' mt='md' mb='xs'>
          <Text style={textStyle} weight={500}>
            {name}
          </Text>
          <Badge color='pink' variant='filled'>
            {channelType}
          </Badge>
        </Group>
      </Card>
    </>
  );
}

export default ChannelCard;
