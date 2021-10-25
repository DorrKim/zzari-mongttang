import React from 'react';
import UploaderTemplate from '@domains/UploaderTemplate';

const UploadPage = () => {
  
  return (
    <UploaderTemplate
      droppable={true}
      width={'328px'}
      height={'248px'}
      type={'square'}
    >
    </UploaderTemplate>
  );
};

export default UploadPage;
