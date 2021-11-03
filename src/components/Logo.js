// import React from 'react';
import React from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import imageSrc from '@assets/logo.png';

const ImageStyled = styled(Image)`
  cursor: pointer;
  width: 156px;
  height: fit-content;
`;

const Logo = ({ link, ...props }) => {
  const history = useHistory();

  return <ImageStyled 
    src={imageSrc} 
    onClick={link ? () => history.push('/') : null}
    {...props} 
  />;
};

Logo.propTypes = {
  link: PropTypes.bool
};

export default Logo;
