import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@base/Modal';
import styled from '@emotion/styled';
import Button from '@base/Button';
import Text from '@base/Text';


const StyledButton = styled(Button)`
  margin-bottom: 20px;
  border-radius: 4px;
  outline: none;

  &:hover {
    filter: brightness(100%);
    transform: scale(1.05);
    transition: 0.1s ease-in-out transform;
  }
  &:focus {
    filter: brightness(90%);
  }
 
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  word-break: keep-all;
  text-align: center;
  line-height: 40px;
  margin: 10px;
`;

const Description = styled.div`
  font-weight: 500;
  word-break: keep-all;
  text-align: center;
  line-height: 40px;
  margin: 0px 10px 10px 10px;
`;


const AlertModal = ({ title, description, visible, handleClose, ...props }) => {
  
  return (
    <Modal visible={visible} {...props}>
      <Title block bold size='lg'>{title}</Title>
      <Description block>{description}</Description>
      <StyledButton 
        width='60px'
        height='40px'
        borderWidth='0'
        onClick={handleClose}>
        <Text 
          block
          color='white'
          bold>
          ㅇㅋ
        </Text>
      </StyledButton>
    </Modal>
  );
};

AlertModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  visible: PropTypes.bool,
  handleClose: PropTypes.func
};

export default AlertModal;
