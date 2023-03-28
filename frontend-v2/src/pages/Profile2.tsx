/* eslint-disable */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Group, Modal, PasswordInput, TextInput, Avatar, Checkbox, FileInput, FileButton } from '@mantine/core';
import { useForm } from "@mantine/form";
import { FormEvent, useState, useEffect } from "react";
import axios from 'axios';
import UserForm from '../components/userform/userform'
import EditChannelButton from '../components/buttons/editChannel'
import NewChannelButton from '../components/buttons/newChannel'

const Profile2: FC = () => {

  return (
    <>
      <h1>Profile Form:</h1>
      <EditChannelButton />
      <NewChannelButton />
    </>
  );
}


export default Profile2;
