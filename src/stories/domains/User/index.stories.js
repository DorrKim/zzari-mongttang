import React from 'react';
import UserProfile from '@domains/UserProfile';


export default {
  title: 'Domain/UserProfile',
  component: UserProfile,
  argTypes: {
    fullName: {
      control: 'text'
    }
  }
};

// const MY_ID = '61759164359c4371f68ac707';

// const response = await fetch(`http://13.209.30.200:5001/users/${MY_ID}`);
// const result = await response.json();

// console.log(result)
export const Default = () => {
  return (
    <UserProfile ></UserProfile>
  );
}; 
