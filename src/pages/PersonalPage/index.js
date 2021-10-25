import React from 'react';
import { useParams } from 'react-router';


const PersonalPage = () => {
  const { userId } = useParams();
  
  return <h1>유저 아이디 {userId}</h1>;
};


export default PersonalPage;
