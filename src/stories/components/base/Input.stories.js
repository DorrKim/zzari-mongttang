import React from 'react';
import Input from '@base/Input';

export default {
  title: 'Component/Base/Input',
  component: Input,
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    fontSize: { control: 'number' }
  }
};

export const Default = props => <Input width={200} height={12} {...props}/>;
