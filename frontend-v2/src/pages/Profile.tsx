/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import { FormEvent, useState } from "react";
import useFetch from "../components/useFetch";
import { User } from "../users"
import { useEffect } from 'react';

type CreateUserFormType = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mfa_enabled: boolean,
  picture: string
}

// Incluir botao image upload
// Fazer figura mostrar avatar

const handleSubmit = async (values: CreateUserFormType, event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

//  var vv = {...values, file: arq}
  var vv = {...values, picture: 'none'}
  console.log("vv:")
  console.log(vv)

  const JSONdata = JSON.stringify(vv)
  const endpoint = 'http://localhost:8080/users/1'

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  }

  const response = await fetch(endpoint, options)

  const result = await response.json()
  console.log("Patching ... :")
  console.log(vv)
}

const UserCreateForm = () => {

  const id: Number = 1;

  const form = useForm<CreateUserFormType>({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mfa_enabled: false,
      picture: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

//  const { error, isPending, data: userData } = useFetch('http://localhost:8080/users/' + id)
   const dbData: any  = useFetch('http://localhost:8080/users/' + id)
    console.log("UserData:")
    console.log(dbData.data)
    console.log(dbData.data?.username)

   var values: CreateUserFormType = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mfa_enabled: false,
      picture: ''
   }
    
    values.username = dbData.data?.username;
    values.firstName = dbData.data?.firstName;
    values.lastName  = dbData.data?.lastName;
    values.email = dbData.data?.email;
    values.password = dbData.data?.password;
    values.mfa_enabled = dbData.data?.mfa_enabled;
    values.picture = dbData.data?.picture;
      console.log("values: ", values)

    useEffect(() => {
      form.setValues(values);
      form.resetDirty(values);
    },[]);

  const [arq, setArq] = useState(null);
  console.log(arq)

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, event))}>

        <Group position="center">
          <Avatar
            src="/images/smile.png"
            size="xl"
          />
        </Group>

        <TextInput
          label="Username"
          placeholder="User"
          {...form.getInputProps('username')}
        />

        <TextInput
          label="FirstName"
          placeholder="John Doe"
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label="LastName"
          placeholder="John Doe"
          {...form.getInputProps('lastName')}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          {...form.getInputProps('password')}
        />

        <Checkbox
          label="Enable 2FA ?"
          {...form.getInputProps('mfa_enabled')}
        />

        <Group position="center" mt="md">
          <Button type="submit">Save Changes</Button>
        </Group>

      </form>
    </Box>
  );
}

const Profile: FC = () => {
  return (
    <>
        <UserCreateForm />
    </>
  );
}

export default Profile;
