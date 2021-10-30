import React, { useState } from 'react';
import AlertModal from '@domains/NotationModal/AlertModal';

export default {
  title: 'Domains/NotationModal/AlertModal',
  component: AlertModal
};

export const Dafault = props => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <button onClick={() => setVisible(true)} >Show Alert Modal</button>
      <AlertModal
        title='로그인 필요'
        description='현재 페이지는 로그인이 필요한 서비스입니다.'
        visible={visible}
        handleClose={() => setVisible(false)} 
        {...props}>
      </AlertModal>
      <div>{visible ? 'yes' : 'no'}</div>
    </>
  );
};
