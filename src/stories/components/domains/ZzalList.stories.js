import React from 'react';

import ZzalList from '@domains/Zzal/ZzalList';

export default {
  title: 'Component/ZzalList',
  component: ZzalList,
  argTypes: {
    channel: 'text'
  }
};

export const Default = args => {
  return <>
    <div style={{ width: '100%',
      height: '50vh' }}></div>
    <div style={{ width: '100%',
      height: '50vh' }}>
      <ZzalList {...args}></ZzalList>
    </div>
  </>;
};
