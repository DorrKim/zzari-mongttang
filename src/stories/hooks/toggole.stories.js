import React from 'react';
import Toggle from '../../components/base/Toggle';

export default {
  title: 'Component/hooks/useToggle',
  component: Toggle
};

const BaseToggle = props => {
  return (
    <Toggle {...props}></Toggle>
  );
};

export const Default = BaseToggle.bind({});
