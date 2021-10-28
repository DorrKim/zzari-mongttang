import React, { useState } from 'react';
import Uploader from '@domains/Uploader';
import PropTypes from 'prop-types';

const UploadPage = () => {
  const [file, setFile] = useState(undefined);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  const setUrl = changedFile => {
    const reader = new FileReader();
    if (!changedFile) {
      setSrc(src);
      
      return;
    }
    reader.readAsDataURL(changedFile);
    reader.addEventListener('load', () => {
      setSrc(reader.result);
      
      return ;
    });
  };

  const handleFileChanged = event => {
    const { target: files } = event;
    const changedFile = files.files[0];
    setFile(changedFile);
    setAlt(changedFile?.name);

    setUrl(changedFile);
  };

  const handleFileDrop = event => {
    event.preventDefault();
    event.stopPropagation();

    const { dataTransfer: files } = event;
    const changedFile = files.files[0];
    setFile(changedFile);
    setAlt(changedFile?.name);

    setUrl(changedFile);
  };

  return (
    <Uploader
      droppable={true}
      width={'328px'}
      height={'248px'}
      type={'square'}
      onDrop={handleFileDrop}
      onChange={handleFileChanged}
      file={file}
      src={src ? src : ''}
      alt={alt}
    >
    </Uploader>
  );
};

Uploader.propTypes = {
  droppable: PropTypes.oneOfType([
    PropTypes.bool
  ])
};

export default UploadPage;
