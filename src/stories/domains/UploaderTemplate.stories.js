import React from 'react';

import Uploader from '@/domains/Uploader';
import Image from '@components/base/Image';
import UploaderTemplate from '@domains/UploaderTemplate';

export default {
  title: 'Component/domains/Uploader',
  component: Uploader
};

export const Default = () => {
  return (
    <Uploader>
      <button>Click</button>
    </Uploader>
  );
};

export const File = () => {
  return (
    <Uploader>
      {file => <button>
        { file ? file.name : 'Click'}
      </button>}
    </Uploader>
  );
};

export const Droppable = () => {
  return (
    <Uploader droppable>
      {(file, dragging) => (
        <div
          style={{
            width: 300,
            height: 100,
            border: '4px dashed #aaa',
            borderColor: dragging ? 'black' : '#aaa'
          }}>
          {file ? file.name : 'image upload'}
        </div>
      )}
    </Uploader>
  );
};

export const DroppableImg = () => {
  return (
    <Uploader droppable>
      {(file, dragging) => (
        file ? <Image
          src={`${file.name}`}
          width={300} 
          height={300} 
          type={'square'}
          style={{
            border: '4px dashed #aaa',
            borderColor: dragging ? 'black' : '#aaa'
          }}> </Image>
          : <div>{'image upload'}</div>
      )}
    </Uploader>
  );
};

export const DroppableTemplateImg = () => {
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
