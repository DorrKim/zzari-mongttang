import React from 'react';
import UserInfo from '@domains/UserProfile/UserInfo';

export default {
  title: 'Domain/User/UserInfo',
  component: UserInfo,
  argTypes: {
    fullName: {
      control: 'text'
    }
  }
};

export const Default = args => {
  return (
    <UserInfo fullName="" {...args}></UserInfo>
  );
};
