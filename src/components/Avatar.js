import React, { useMemo } from 'react';
import Image from '@base/Image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import colors from '@constants/colors';
// import { useAuthorization } from '@context/AuthorizationProvider';


const StyledImage = styled(Image)`
  border: 2px double ${colors.PRIMARY_BACKGROUND};
  border-width: 5px;
  overflow: hidden;
  object-fit: cover;
  position: relative;
  
  `;

const Avatar = ({ src, size, fullName, onClick, ...props }) => {
  // const { authState: { myUser: { fullName }}} = useAuthorization();
  
  const DEFAULT_AVATAR_SRC = useMemo(() => `https://avatars.dicebear.com/api/adventurer-neutral/${fullName}.svg`, [fullName]);

  return (
    <StyledImage
      type='circle'
      src={src || DEFAULT_AVATAR_SRC} 
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
  fullName: PropTypes.string,
  onClick: PropTypes.func
};

export default Avatar;
