import React from 'react';
import Image from '@components/base/Image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const DEFAULT_PROFILE_URL = 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'; 

const StyledImage = styled(Image)`
  outline: 2px solid;
  overflow: hidden;
  object-fit: cover;
`;

const Avatar = ({ src = DEFAULT_PROFILE_URL, size, onClick, ...props }) => {

  return (
    <StyledImage
      type='circle'
      src={src} 
      width={size} 
      height={size} 
      onClick={onClick}
      {...props}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func
};

export default Avatar;
