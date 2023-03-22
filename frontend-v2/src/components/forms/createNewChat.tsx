/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "@mantine/form";
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton, Select } from '@mantine/core';
import { FormEvent, useState, useEffect } from "react";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

type CreateNewChatType = {
  channelName: string,
  channelOwner: string,
  password: string,
  channelAdmins: string[]
}

type string_or_null =  string | null

const handleSubmit = async (values: CreateNewChatType, ctype:string_or_null, event: FormEvent<HTMLFormElement>, endpoint_write : string) => {
  event.preventDefault()

  const JSONdata = JSON.stringify(values)
  const endpoint = endpoint_write 

  const vv = {...values, 'channelType' : ctype}
  console.log('vv: ', vv)

  const result = await axios.patch(endpoint, vv)
}

const UserCreateForm = (props:any ) => {
    const [ctype, setCtype] = useState<string_or_null>(null);

    const channel = props.values;

    const form = useForm<CreateNewChatType>({
      initialValues: {
        channelName: channel.channelName,
        channelOwner: channel.channelOwner, 
        password: channel.channelType,
        channelAdmins: [],
      }
    });

    console.log("form" , form.values)

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, ctype, event, props.ep))}>

        <TextInput
          label="New Channel Name:"
          {...form.getInputProps('channelName')}
        />

        <TextInput
          label="Channel Owner: "
          {...form.getInputProps('channelOwner')}
        />

        <Select
          label="Please Choose Channel Type: "
          placeholder="Pick one"
          value={ctype}
          onChange={setCtype}
          data={[
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'password', label: 'Password Protected' },
          ]}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          {...form.getInputProps('password')}
        />

        <Group position="center" mt="md">
          <Button type="submit">Save Changes</Button>
        </Group>

      </form>
    </Box>
  )

}

const CreateNewChat: FC = () => {

  const id = "1";
  const endpoint_read : string = "http://localhost:8080/channels/1";
  const endpoint_write : string = "http://localhost:8080/channels/1";

  var [channelData, setchannelData] = useState<any>(null);

  useEffect(() => {
    async function fetchData(id: string) {
      try {
          const response = await axios.get(endpoint_read)
          setchannelData(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(id);
      console.log("Channel Data: ", channelData)
  },[])

  return (
    <>
      {!channelData &&
        <h1> Loading ... </h1>
      }
      {channelData &&
        <UserCreateForm values={channelData} ep={endpoint_write}/>}
    </>
  );
}

export default CreateNewChat;
