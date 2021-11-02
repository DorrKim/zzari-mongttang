import React, { useState, useCallback } from 'react';
import ConfirmModal from '@domains/NotationModal/ConfirmModal';

export default {
  title: 'Domains/NotationModal/ConfirmModal',
  component: ConfirmModal
};

export const Dafault = props => {
  const [visible, setVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState();
  
  const handleClickConfirm = useCallback(() => {
    setIsConfirmed(true);  
    setVisible(false);
  }, [setVisible]);

  const handleClickCancel = useCallback(() => {
    setIsConfirmed(false);  
    setVisible(false);
  }, [setVisible]);

  return (
    <>
      <button onClick={() => setVisible(true)} >Show Confirm Modal</button>
      <div>{`Confirm: ${isConfirmed ? 'Yes' : 'no'}`}</div>
      <ConfirmModal
        title='국민의 재산권'
        description='군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.'
        visible={visible}
        handleClickConfirm={handleClickConfirm}
        handleClickCancel={handleClickCancel} 
        {...props}>
      </ConfirmModal>
    </>
  );
};
