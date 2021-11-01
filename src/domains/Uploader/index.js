import React, { useCallback, useRef, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import defaultImageSrc from '@assets/select_image.png';
import colors from '@constants/colors';

const FILE_TYPE = 'image/*';

const Input = styled.input({
  display: 'none'
});

const Uploader = ({ 
  accept = FILE_TYPE,
  droppable, 
  src,
  alt,
  style, 
  width,
  height,
  type,
  onChange,
  ...props }) => {
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const handleFileSelect = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef.current]);

  const handleFileChange = useCallback(event => {
    setDragging(false);
    onChange && onChange(event);
  }, [onChange]);

  const handleDragOver = useCallback(event => {
    if (!droppable) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  }, [droppable]);
  
  const handleDragLeave = useCallback(event => {
    handleDragOver(event);
    setDragging(false);
  }, [handleDragOver]); 

  return (
    <InputContainer 
      style={{ 
        width,
        height,
        ...style 
      }}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleFileChange}
      dragging={dragging}
      type={type}
      {...props}
    >
      <Input
        type='file'
        ref={inputRef}
        name={droppable ? 'post' : 'profile'}
        accept={accept}
        onChange={handleFileChange}
      />
      <ImagePreview
        src={src || defaultImageSrc }
        alt={alt}
        type={type}
        onClick={handleFileSelect}
        style={{ 
          mixBlendMode: 'multiply',
          ...style 
        }}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
display: inline-block;
border-radius: ${({ type }) => type === 'circle' ? '50%' : '3px'};
border: ${({ dragging }) => dragging ? ` 3px solid ${colors.ACCENT}` : `2px solid ${colors.PRIMARY_BACKGROUND}`};
position: relative;
&:hover {
  background-color: rgba(0,0,0,.1);
  ::after {
    content: '수정';
    position: absolute;
    color: ${colors.ACCENT_BACKGROUND};
    font-size: 1.5rem;
    font-weight: 800;
    top: 80%;
    left: 50%;
    transform:translate(-50%,-50%);
  }
}
`;

const ImagePreview = styled(Image)`
  width: 100%;
  height: 100%;
`;

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
  src: PropTypes.string,
  alt: PropTypes.string
};

export default Uploader;
