import React from 'react';
import Image from '@components/base/Image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const defaultProfileImage = 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'; 

const StyledImage = styled(Image)`
  outline: 2px solid;
  cursor: pointer;
  overflow: hidden;
  object-fit: cover;
`;

const Avatar = ({ src = defaultProfileImage, size, onClick }) => {

  return (
    <StyledImage
      type='circle'
      src={src} 
      width={size} 
      height={size} 
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
