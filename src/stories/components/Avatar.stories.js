import React from 'react';
import Avatar from '@components/Avatar';

export default {
  title: 'Component/Avatar',
  component: Avatar,
  argTypes: {
    src: {
      control: 'text'
    },
    size: {
      control: {
        type: 'range',
        min: 20,
        max: 500
      }
    },
    onClick: {
      actions: 'clicked'
    }
  }
};


export const Default = args => {
  
  return (
    <Avatar {...args}></Avatar>
  );
};
