import React from 'react';
import Input from '@base/Input';

export default {
  title: 'Component/Base/Input',
  component: Input,
  argTypes: {
    width: { 
      control: {
        type: 'range',
        min: 50,
        max: 500,
        step: 1 
      }
    },
    height: { 
      control: {
        type: 'range',
        min: 10,
        max: 100,
        step: 1 
      }},
    fontSize: { control: 'number' }
  }
};

export const Default = props => <Input width={200} height={12} {...props}/>;
