import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";
import { GoogleButton } from "./SocialButtons";

type CreateUserFormType = {
  user: string,
  full_name: string,
  email: string,
  password: string,
  tfa: boolean,
  file: string
}

const handleSubmit = async (values: CreateUserFormType, event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  const JSONdata = JSON.stringify(values)
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
  console.log(values)
}

const UserCreateForm = () => {

  const form = useForm<CreateUserFormType>({
    initialValues: {
      user: '',
      full_name: '',
      email: '',
      password: '',
      tfa: false,
      file: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, event))}>
        <Avatar
          src="/images/smile.png"
          size="xl"
        />
        
        <FileInput
          label="Upload Image"
          placeholder="AvatarImage.png"
          {...form.getInputProps('file')}
        />

        <TextInput
          withAsterisk
          label="User"
          placeholder="User"
          {...form.getInputProps('user')}
        />

        <TextInput
          withAsterisk
          label="FullName"
          placeholder="John Doe"
          {...form.getInputProps('full_name')}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          required
          {...form.getInputProps('password')}
        />

        <Checkbox
          label="Enable 2FA ?"
          {...form.getInputProps('tfa')}
        />

        <Group position="right" mt="md">
          <Link href="/api/auth/google"><GoogleButton type="button">Register with Google</GoogleButton></Link>
          <Button type="submit">Register</Button>
        </Group>

      </form>
    </Box>
  );
}

export const SignUpButton: FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <UserCreateForm />
      </Modal>

      <Group position="center">
        <Button color="red" onClick={() => setOpened(true)}>Sign Up</Button>
      </Group>
    </>
  );
}

export default SignUpButton;
