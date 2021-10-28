import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import axios from 'axios';

import UserProfile from '@domains/UserProfile';
const BASE_URL = 'http://13.209.30.200:5001';

axios.defaults.baseURL = BASE_URL;

const PersonalPage = () => {
  const { userId } = useParams();
  const [initialUser, fetchUser] = useAxios(`/users/${userId}`);

  useEffect(() => {
    const { isLoading, value } = initialUser;
    console.log(isLoading, value);
  }, [initialUser.value]);

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <>
      <h1>유저 아이디 {userId}</h1>
      <UserProfile></UserProfile>
    </>
  );
  
};


export default PersonalPage;
