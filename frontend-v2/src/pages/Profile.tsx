/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import { FormEvent, useState } from "react";
import useFetch from "../components/useFetch";
import { User } from "../users"
import { useEffect } from 'react';
import axios from 'axios';

type CreateUserFormType = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mfa_enabled: boolean,
  picture: File | null
}

const handleSubmit = async (values: CreateUserFormType, event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

//  var vv = {...values, file: arq}
//  var vv = {...values, picture: 'none'}
  var vv = {...values}
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

  const dbData: any  = useFetch('http://localhost:8080/users/' + id)
    console.log("UserData:")
    console.log(dbData?.data)

    const form = useForm<CreateUserFormType>({
      initialValues: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mfa_enabled: false,
        picture: null
      },

      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    });

   var values: CreateUserFormType = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mfa_enabled: false,
      picture: null
   }
    

//    useEffect(() => {
//          values.username = dbData.data?.username;
//          values.firstName = dbData.data?.firstName;
//          values.lastName  = dbData.data?.lastName;
//          values.email = dbData.data?.email;
//          values.password = dbData.data?.password;
//          values.mfa_enabled = dbData.data?.mfa_enabled;
//          values.picture = dbData.data?.picture;
//            console.log("values: ", values)
//          form.setValues(values);
//          form.resetDirty(values);
//    }, []);

  const [arq, setArq] = useState<File | null>(null);

//  return (
//    <Box sx={{ maxWidth: 500 }} mx="auto">
//      <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, event))}>
//
//        <Group position="center">
//          <Avatar
//            // Pega arquivo da pasta public/
//            src="smile.png"
//            size="xl"
//          />
//        </Group>
//        <Group position="center">
//          <FileButton onChange={setArq} accept="image/png,image/jpeg">
//            {(props) => <Button {...props}>Upload image</Button>}
//          </FileButton>
//        </Group>
//
//        <TextInput
//          label="Username"
//          {...form.getInputProps('username')}
//        />
//
//        <TextInput
//          label="FirstName"
//          {...form.getInputProps('firstName')}
//        />
//
//        <TextInput
//          label="LastName"
//          {...form.getInputProps('lastName')}
//        />
//
//        <TextInput
//          label="Email"
//          placeholder="your@email.com"
//          {...form.getInputProps('email')}
//        />
//
//        <PasswordInput
//          label="Password"
//          placeholder="Your password"
//          required
//          {...form.getInputProps('password')}
//        />
//
//        <Checkbox
//          label="Enable 2FA ?"
//          {...form.getInputProps('mfa_enabled')}
//        />
//
//        <Group position="center" mt="md">
//          <Button type="submit">Save Changes</Button>
//        </Group>
//
//      </form>
//    </Box>
//  );

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {dbData?.data && dbData.data.username}
      ... Texto Fixo ...
      {dbData?.data && dbData.data.username}
    </Box>
  )
}

const Profile: FC = () => {
  return (
    <>
        <UserCreateForm />
    </>
  );
}

export default Profile;
