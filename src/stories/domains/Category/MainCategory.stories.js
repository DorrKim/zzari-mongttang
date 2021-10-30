import React from 'react';
import Category from '@domains/Category';

export default {
  title: 'Component/MainCategory',
  component: Category.MainCategory,
  argTypes: {
  }
};

export const Default = args => {
  return <Category.MainCategory {...args} />;
};
