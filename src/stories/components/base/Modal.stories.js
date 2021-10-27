import React, { useState } from 'react';
import Modal from '@base/Modal';

export default {
  title: 'Component/base/Modal',
  component: Modal,
  argTypes: {
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    }
  }
};

export const Default = args => {
  const [visible, setVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setVisible(true)} >Show Modal</button>
      <Modal 
        {...args} 
        visible={visible} 
        onClose={() => setVisible(false)}>
        Hi
      </Modal>
    </div>
  );
};
