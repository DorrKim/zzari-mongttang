import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Image from '@components/base/Image';

const FILE_TYPE = 'image/* video/*';

const resizedStyle = { objectFit: 'cover' };

const Input = styled.input({
  display: 'none'
});

const Uploader = ({ accept = FILE_TYPE, droppable, 
  file, src, alt,
  onChange, onDrop, style, 
  width, height, type, 
  children, ...props }) => {
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);
  
  const handleFileChosen = () => {
    inputRef.current.click();
  };
  
  const handleDragOver = event => {
    if (!droppable) {
      return;
    }
  
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = event => {
    handleDragOver(event);
    setDragging(false);
  };
  
  return (
    <div 
      style={{ display: 'inline-block',
        ...style }}
      onClick={handleFileChosen}
      onDrop={onDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input
        type='file'
        ref={inputRef}
        name={droppable ? 'post' : 'profile'}
        accept={accept}
        onChange={onChange}
      />
      {file || src !== ''
        ? <div>
          <Image
            src={src}
            alt={alt}
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
            borderColor: dragging ? '#FD9F28' : '#aaa'
          }}
        >
          {'image upload!'}
        </div>}
      {children}
    </div>
  );
};

Uploader.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.string,
  droppable: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onDrop: PropTypes.func,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ]),
  type: PropTypes.oneOf([
    'circle',
    'square'
  ]),
  file: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string
};

export default Uploader;
