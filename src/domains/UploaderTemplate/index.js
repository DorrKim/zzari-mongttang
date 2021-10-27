import React from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import Uploader from '@domains/Uploader';

const FILE_TYPE = 'image/* video/*';

const UploaderTemplate = ({ droppable, accept = FILE_TYPE, 
  width, height, type, style }) => {
      
  const resizedStyle = { objectFit: 'cover' };
  
  return (
    <Uploader
      droppable={droppable}
      accept={accept}
    >
      {(file, dragging, src) => (
        file 
          ? <div>
            <Image
              src={src ? src : ''}
              alt='zzal'
              width={width} 
              height={height}
              type={type}
              style={{ ...resizedStyle,
                ...style }}

            >
            </Image>
          </div>
          : <div 
            style={{
              width: `${width}`,
              height: `${height}`,
              border: '4px dashed #aaa',
              borderColor: dragging ? 'black' : '#aaa'
            }}
          >
            {'image upload'}
          </div>
      )}
    </Uploader>
  );
};

UploaderTemplate.propTypes = {
  droppable: PropTypes.bool,
  style: PropTypes.object,
  accept: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.oneOf([
    'circle',
    'square'
  ])
};

export default UploaderTemplate;
