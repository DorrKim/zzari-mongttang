import React from 'react';
import Image from '@components/base/Image';
import PropTypes from 'prop-types';

const Avatar = ({ src, size, threshold, placeholder, lazy, onClick }) => {
  return (
    <Image 
      type='circle' 
      width={size} 
      height={size} 
      src={src} 
      threshold={threshold} 
      placeholder={placeholder} 
      lazy={lazy}
      onClick={onClick}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  onClick: PropTypes.func
};

export default Avatar;
