import { Box, Button, Checkbox, Container, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { setCookie } from "../utils/cookies";
import { http } from "../utils/http";
import { useRouter } from "next/router";

const Login = () => {

  const router = useRouter();

  async function onSubmit(event) {
    const username = event.email
    const password = event.password

    const {data} =  await http.post('login', {username, password}) 
    setCookie('token', data.token);
    router.push('/private');
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  })

  return (
    <Container>
      <Box sx={{ maxWidth: 300 }} mx="auto" p="xs">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
          label="Password"
          {...form.getInputProps('password')}
          />
          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Container>
  )
}

export default Login;