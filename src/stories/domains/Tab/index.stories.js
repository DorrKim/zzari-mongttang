import React from 'react';
import Tab from '@/domains/Tab';
import Text from '@/components/base/Text';

export default {
  title: 'Domain/Tab',
  component: Tab
};

export const Default = () => {
  return (
    <Tab>
      <Tab.Header>
        <Tab.Item index={0}><Text bold>좋아요</Text></Tab.Item>
        <Tab.Item index={1}><Text bold>내짤</Text></Tab.Item>
      </Tab.Header>
      <Tab.Panel>
        <div index={0}> 좋아요!!!!</div>
        <div index={1}> 내짤!!!!!</div>
      </Tab.Panel>
    </Tab>
  );
};
