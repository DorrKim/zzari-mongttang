import React from 'react';
import TabItem from '@domains/Tab/TabItem';

export default {
  title: 'Domain/Tab/TabItem',
  component: TabItem
};

export const Default = (...props) => {
  return (
    <TabItem {...props}>TabItem</TabItem>
  );
};
