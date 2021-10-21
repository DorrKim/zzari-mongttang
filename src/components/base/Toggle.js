import React from 'react';
import useToggle from '../../hooks/useToggle';

const Toggle = () => {
  
  const [isToggled, handleToggle] = useToggle(true);
 
  const handleClick = () => {
    handleToggle();
  };
  
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

export default Toggle;
