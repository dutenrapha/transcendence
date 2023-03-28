import { PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormEvent, ForwardRefRenderFunction, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUserDto, useLogin } from '../../hooks/useLogin';

export const ForwardedUserForm: ForwardRefRenderFunction<HTMLButtonElement> = (_props, ref) => {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (values: LoginUserDto, e: FormEvent) => {
    e.preventDefault();

    const loginUserDto: LoginUserDto = {
      username: values.username,
      password: values.password,
    };

    await login(loginUserDto);
  };

  const form = useForm<LoginUserDto>({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit(async (values, event) => handleSubmit(values, event))}>
      <Stack>
        <TextInput
          withAsterisk
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('username')}
        />

        <PasswordInput
          withAsterisk
          label='Password'
          placeholder='Your password'
          required
          {...form.getInputProps('password')}
        />
      </Stack>
      <button type='submit' ref={ref} style={{ display: 'none' }} />
    </form>
  );
};

const LoginForm = forwardRef(ForwardedUserForm);

export default LoginForm;
