import React from 'react';
import UserProfile from '@domains/UserProfile';


export default {
  title: 'Domains/UserProfile',
  component: UserProfile,
  argTypes: {
    fullName: {
      control: 'text'
    }
  }
};

export const Default = args => {
  return (
    <UserProfile {...args} ></UserProfile>
  );
}; 
