import { FC, FormEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Select } from '@mantine/core';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';

type EditChatType = {
  channelName: string;
  channelOwner: string;
  password: string;
  channelAdmins: string[];
};

type string_or_null = string | null;

const handleSubmit = async (
  values: EditChatType,
  ctype: string_or_null,
  event: FormEvent<HTMLFormElement>,
  EndpointWrite: string,
) => {
  event.preventDefault();

  const endpoint = EndpointWrite;

  const vv = { ...values, channelType: ctype };
  console.log('vv: ', vv);

  await axios.post(endpoint, vv);
};

const UserCreateForm = (props: any) => {
  const [ctype, setCtype] = useState<string_or_null>(null);

  const form = useForm<EditChatType>({
    initialValues: {
      channelName: '',
      channelOwner: '',
      password: '',
      channelAdmins: [],
    },
  });

  console.log('form', form.values);

  return (
    <Box sx={{ maxWidth: 500 }} mx='auto'>
      <form
        onSubmit={form.onSubmit(async (values, event) =>
          handleSubmit(values, ctype, event, props.ep),
        )}
      >
        <TextInput label='New Channel Name:' {...form.getInputProps('channelName')} />

        <TextInput label='Channel Owner: ' {...form.getInputProps('channelOwner')} />

        <Select
          label='Please Choose Channel Type: '
          placeholder='Pick one'
          value={ctype}
          onChange={setCtype}
          data={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'password', label: 'Password Protected' },
          ]}
        />

        {ctype == 'password' && (
          <PasswordInput
            label='Password'
            placeholder='Your password'
            required
            {...form.getInputProps('password')}
          />
        )}

        <Group position='center' mt='md'>
          <Button type='submit'>Save Changes</Button>
        </Group>
      </form>
    </Box>
  );
};

const EditChatForm: FC = () => {
  const EndpointWrite = 'http://localhost:8080/channels/';

  return <>{<UserCreateForm values='' ep={EndpointWrite} />}</>;
};

function NewChannelButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title='Edit Channel Information'>
        <EditChatForm />
      </Modal>

      <Group position='center'>
        <Button onClick={open}>New Channel</Button>
      </Group>
    </>
  );
}

export default NewChannelButton;
