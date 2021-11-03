import React from 'react';
import PropTypes from 'prop-types';

import ConfirmModal from './ConfirmModal';


const LoginConfirmModal = ({ visible, 
  handleClickConfirm, 
  handleClickCancel, ...props }) => {

  return <ConfirmModal
    title='알림'
    description='해당 기능을 이용하기 위해서 로그인이 필요합니다. </br> 로그인 페이지로 이동하시겠습니까?'
    visible={visible}
    handleClickCancel={handleClickCancel}
    handleClickConfirm={handleClickConfirm}
    {...props}
  />;
};

LoginConfirmModal.propTypes = {
  visible: PropTypes.bool,
  handleClickConfirm: PropTypes.func,
  handleClickCancel: PropTypes.func
};

export default LoginConfirmModal;
