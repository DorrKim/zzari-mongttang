import React from 'react';
import Text from '@base/Text.js';

export default {
  title: 'Component/base/Text',
  component: Text,
  argTypes: {
    children: {
      control: 'text'
    },
    block: {
      control: 'boolean',
      defaultValue: false
    },
    size: { 
      options: ['sm', 'md', 'lg'],
      control: 'select' 
    },
    bold: {
      control: 'boolean',
      defaultValue: false
    },
    color: { control: 'color' }
  }
};

export const Default = args => {
  return <Text {...args} ></Text>;
};
