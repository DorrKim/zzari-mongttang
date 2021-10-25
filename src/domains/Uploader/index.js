import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Input = styled.input({
  display: 'none'
});

const Uploader = ({ accept, value, droppable, 
  children, onChange, style, ...props }) => {
  const [file, setFile] = useState(value);
  const [dragging, setDragging] = useState(false);
  const [src, setSrc] = useState('');

  const inputRef = useRef(null);

  const handleFileChanged = event => {
    // eslint-disable-next-line prefer-destructuring
    const files = event.target.files;
    
    const changedFile = files[0];

    setFile(changedFile);
    onChange && onChange(changedFile);

    const reader = new FileReader();

    reader.readAsDataURL(changedFile);
    reader.addEventListener('load', () => {
      // eslint-disable-next-line prefer-destructuring 
      setSrc(reader.result);
    });
  };

  const handleFileChosen = () => {
    inputRef.current.click();
  };

  const handleDrageDefault = event => {
    if (!droppable) {
      return;
    }
  
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDragEnter = event => {
    handleDrageDefault(event);

    // eslint-disable-next-line prefer-destructuring
    const { items } = event.dataTransfer;
    if (items && items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave = event => {
    handleDrageDefault(event);
    setDragging(false);
  };

  const handleDragOver = event => {
    handleDrageDefault(event);
  };

  const handleFileDrop = event => {
    handleDrageDefault(event);
    // eslint-disable-next-line prefer-destructuring
    const { files } = event.dataTransfer;
    const changedFile = files[0];
    setFile(changedFile);
    onChange && onChange(changedFile);

    const reader = new FileReader();

    reader.readAsDataURL(changedFile); //file
    reader.addEventListener('load', () => {
      // eslint-disable-next-line prefer-destructuring 
      setSrc(reader.result);
    });
    setDragging(false);
  };

  return (
    <div 
      style={{ display: 'inline-block',
        ...style }}
      onClick={handleFileChosen}
      onDrop={handleFileDrop}
      onDrageEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input
        type='file'
        ref={inputRef}
        name={droppable ? 'post' : 'profile'}
        accept={accept}
        onChange={handleFileChanged}
      />
      {typeof children === 'function' ? children(file, dragging, src) : children}
    </div>
  );
};

Uploader.propTypes = {
  name: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.string,
  droppable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object
  ]),
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default Uploader;
