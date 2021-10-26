import React from 'react';
import Header from '@domains/Header';

export default {
  title: 'Domains/Header',
  argTypes: {
    isAuthorized: {
      control: 'boolean'
    }
  }
};

export const Default = args => <Header {...args}/>;
