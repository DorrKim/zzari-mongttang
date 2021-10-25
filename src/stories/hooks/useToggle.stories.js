import React, { useCallback } from 'react';
import useToggle from '@hooks/useToggle';

export default {
  title: 'Component/hooks/useToggle',
  component: useToggle
};

const Toggle = () => {
  const [isToggled, handleToggle] = useToggle(true);

  const handleClick = useCallback(() => {
    handleToggle();
  }, []);

  return (
    <>
      <button 
        type="button"
        onClick={handleClick}
      >
        toggle
      </button>
      <h1>{isToggled * 1}</h1>
    </>
  );
};

const BasicToggle = props => {
  return (
    <Toggle {...props}></Toggle>
  );
};

export const Default = BasicToggle.bind({});
