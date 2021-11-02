import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@base/Modal';
import styled from '@emotion/styled';
import Button from '@base/Button';
import Text from '@base/Text';
import Flex from '@base/Flex';


const ConfirmButton = styled(Button)`
  margin: 0 15px 20px 15px;
  border-radius: 4px;
`;

const CancelButton = styled(Button)`
  margin: 0 15px 20px 15px;
  border-radius: 4px;
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

const ConfirmModal = ({ title, 
  description, 
  visible, 
  handleClickConfirm, 
  handleClickCancel, ...props }) => {
  
  return (
    <Modal visible={visible} {...props}>
      <Title block bold size='lg'>{title}</Title>
      <Description block>{description}</Description>
      <Flex>
        <ConfirmButton 
          width='80px'
          height='40px'
          borderWidth='0'
          onClick={handleClickConfirm}>
          <Text 
            block
            color='white'
            bold>
          OK
          </Text>
        </ConfirmButton>
        <CancelButton 
          width='80px'
          height='40px'
          borderWidth='0'
          backgroundColor="#bdbdbd"
          onClick={handleClickCancel}>
          <Text 
            block
            color='white'
            bold>
          Cancel
          </Text>
        </CancelButton>
      </Flex>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  visible: PropTypes.bool,
  handleClickConfirm: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired
};

export default ConfirmModal;
