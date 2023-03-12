/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import { FormEvent, useState } from "react";
import useFetch from "../components/useFetch";
import { User } from "../users"

// const Profile: FC = () => {
//  return (
//    <div>
//      <h1>Profile</h1>
//      <p>Dolor aliquip id laboris id sunt ut mollit nulla sunt tempor anim.</p>
//      <p>
//        Commodo commodo officia adipisicing Lorem culpa amet magna proident ad ad. Officia mollit
//        amet irure quis dolore anim non eu excepteur culpa commodo amet eu. Eiusmod tempor ad
//        cupidatat cupidatat occaecat velit et consequat qui ipsum occaecat labore esse. Mollit ad
//        amet aliquip proident qui eu proident voluptate fugiat non ad ipsum excepteur.
//      </p>
//      <Link to='/'>Go to Home</Link>
//    </div>
//  );
// };
//
// export default Profile;
//

type CreateUserFormType = {
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mfa_enabled: boolean,
  picture: string
}

// Get Data
// Get id (hardcoded for now)
// Show form with data
// Make Patch
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

//  const { error, isPending, data: userData } = useFetch('http://localhost:8080/users/' + id)
  const dbData: any  = useFetch('http://localhost:8080/users/' + id)
    console.log("UserData:")
    console.log(dbData.data)
    console.log(dbData.data?.username)

  const form = useForm<CreateUserFormType>({
    initialValues: {
      username: dbData.data?.username,
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
//          placeholder="User"
            placeholder = {dbData.data?.username}
          {...form.getInputProps('username')}
        />

        <TextInput
          label="FirstName"
//          placeholder="John Doe"
         placeholder = {dbData.data?.firstName}
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label="LastName"
//          placeholder="John Doe"
         placeholder = {dbData.data?.lastName}
          {...form.getInputProps('lastName')}
        />

        <TextInput
          label="Email"
//          placeholder="your@email.com"
          placeholder = {dbData.data?.email}
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
