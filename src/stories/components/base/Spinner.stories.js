import React from 'react';
import Spinner from '@base/Spinner';

export default {
  title: 'Component/base/Spinner',
  component: Spinner,
  argTypes: {
    
  }
};

export const Default = args => {
  return <Spinner {...args} />;
};
