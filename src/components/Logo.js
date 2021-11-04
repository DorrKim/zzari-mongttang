// import React from 'react';
import React from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import imageSrc from '@assets/logo.png';
import loginImageSrc from '@assets/login.png';
import signupImageSrc from '@assets/signup.png';
import uploadImageSrc from '@assets/up.png';
import editImageSrc from '@assets/edit.png';
import smallLogoSrc from '@assets/logo_small.ico';

const ImageStyled = styled(Image)`
  cursor: pointer;
  object-fit: cover;
  ${({ name }) => name 
    ? ({
      width: 100,
      height: 100
    }) 
    : ({
      width: 156,
      height: 56
    })}
`;

const Logo = ({ link, name, ...props }) => {
  const history = useHistory();

  const additionalImageSrc = {
    login: loginImageSrc,
    signup: signupImageSrc,
    edit: editImageSrc,
    upload: uploadImageSrc  
  };

  return (
    <LogoContainer
      name={name}
      onClick={link ? () => history.push('/') : null}
      {...props} >
      <ImageStyled
        name={name}
        src={name ? smallLogoSrc : imageSrc} 
        
      />
      {name
        ? (<AdditionalImage src={additionalImageSrc[name]} />)
        : null
      }
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
position: relative;


&:hover img:first-child  {
  ${({ name }) => name ? ({ animation: 'bounce .3s linear' }) : null}
  }

@keyframes bounce {
  0%{
    transform: scale(1);
  }
  25%{
    transform: scale(.95) scaleX(.9);
  }
  50%{
    transform: scale(1) rotateY(180deg);
  }
  75%{
    transform: scale(1.05) scaleX(1.02);
  }
  100%{
    transform: scale(1) rotateY(360deg);
  }
}
`;

const AdditionalImage = styled(Image)`
width: 100px;
height: 40px;
object-fit: contain;
position: absolute;
right: -50px;
top: 65px;
`;

Logo.propTypes = {
  link: PropTypes.bool,
  name: PropTypes.string
};

export default Logo;
