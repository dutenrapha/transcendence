import { NextPage } from "next";
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { nextConfig } from "../next.config.js" 

type CreateUserFormType = {
  user: string,
  full_name: string,
  email: string,
  password: string,
  tfa: boolean,
  file: string
}

const handleSubmit = async (values: CreateUserFormType, event: FormEvent<HTMLFormElement>, arq: File) => {
  event.preventDefault()

  var vv = {...values, file: arq}
  console.log("vv:")
  console.log(vv)

  const JSONdata = JSON.stringify(vv)
  const endpoint = '/api/users'

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  }

  const response = await fetch(endpoint, options)

  const result = await response.json()
  console.log(`Is this your full name: ${result.data}`)
  console.log(vv)
}

const UserCreateForm = () => {

  const form = useForm<CreateUserFormType>({
    initialValues: {
      user: '',
      fullname: '',
      email: '',
      password: '',
      enable2fa: false,
      file: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [arq, setArq] = useState<File>();
  console.log(arq)

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, event, arq))}>

        <Group position="center">
          <Avatar
            src="/images/smile.png"
            size="xl"
          />
        </Group>

        <Group position="center">
          <FileButton onChange={setArq} accept="image/png,image/jpeg" >
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>
        
        <TextInput
          label="User"
          placeholder="User"
          {...form.getInputProps('user')}
        />

        <TextInput
          label="FullName"
          placeholder="John Doe"
          {...form.getInputProps('fullname')}
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
          {...form.getInputProps('enable2fa')}
        />

        <Group position="center" mt="md">
          <Button type="submit">Save Changes</Button>
        </Group>

      </form>
    </Box>
  );
}

const About: NextPage = () => {

  return (
    <>
        <UserCreateForm />
    </>
  );
}

export default About;
