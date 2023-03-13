/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import { FormEvent, useState, useEffect } from "react";
import useFetch from "../components/useFetch";
import { User } from "../users"
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

const UserCreateForm = (x: any) => {

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

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      ... Texto Fixo ...
    </Box>
  )

}

const Profile2: FC = () => {

  const id: string = "1";
  var [userData, setuserData] = useState<any>(null);

  useEffect(() => {
    async function fetchData(id: string) {
      console.log("id: ", id);
      try {
          const response = await axios.get("http://localhost:8080/users/" + id)
          console.log("res: ", response.data)
          setuserData(response.data)
          console.log("User Data1: ", userData)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData(id);
      console.log("User Data2: ", userData)
  },[])

  return (
    <>
      {!userData && <h1> Loading ... </h1>}
      {userData && userData?.username }
      {userData &&
        <UserCreateForm  />}
    </>
  );
}


export default Profile2;
