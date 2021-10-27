import React from 'react';
import SearchBar from '@domains/Search';

export default {
  title: 'Component/SearcForm',
  component: SearchBar,
  argTypes: {
    onSubmit: { action: 'onToSubmitPage' }
  }
};

export const Default = args => {
  return <SearchBar onToSubmitPage={() => alert('go to SearchPage')} {...args} />;
};
