import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ImageStyled = styled.img`
  display: 'block';
  width: ${({ width }) => width};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

let observer = null;
const IMAGE_LOAD_EVENT = 'detectImage';

const onIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(IMAGE_LOAD_EVENT));
    }
  });
};

const Image = ({ lazy, threshold = 0, src, placeholder, width, height, type = 'square', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [detected, setDetected] = useState(false);
  const imgRef = useRef(null);

  const imageType = {
    'circle': '50%',
    'square': '0'
  };

  const handleLoadImage = () => {
    setLoaded(true);
  };
  const handleDetectImage = () => {
    setDetected(true);
  };

  useEffect(() => {
    if (!lazy){
      setDetected(true);
      
      return;
    }
    imgRef.current?.addEventListener(IMAGE_LOAD_EVENT, handleDetectImage);

    return () => imgRef.current?.removeEventListener(IMAGE_LOAD_EVENT, handleDetectImage);
  }, [lazy]);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, { threshold });
    }
    imgRef.current && loaded && observer.observe(imgRef.current);
  }, [observer, loaded]);


  return (
    <ImageStyled 
      ref={imgRef}
      src={detected ? src : placeholder} 
      width={width} 
      height={height} 
      borderRadius={imageType[type]} 
      onLoad={handleLoadImage} 
      {...props}
    />
  );
};

export default Image;

Image.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.oneOf(['circle', 'square']),
  style: PropTypes.object
};

