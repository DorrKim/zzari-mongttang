import Checkbox from '../../../components/base/Checkbox';
import React from 'react';

export default {
  title: 'Component/base/Checkbox',
  component: Checkbox,
  args: {
    name: '카테고리'
  }
};

export const Default = args => <Checkbox {...args} />;
