import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const IMAGE_TYPES = {
  circle: css`
    border-radius: 50%;
  `,
  square: css`
  border-radius: 0;`
};

const ImageStyled = styled.img`
  display: 'block';
  ${({ type }) => type};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
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

const Image = ({ 
  lazy,
  threshold = 0,
  src,
  placeholder, 
  width,
  height,
  type = 'square',
  ...props 
}) => {
  const [state, setState] = useState({
    isloaded: false,
    isdetected: false
  });
  const imgRef = useRef(null);

  const handleLoadImage = () => {
    setState({ 
      ...state,
      isloaded: true
    });
  };
  const handleDetectImage = () => {
    setState({ 
      ...state,
      isdetected: true
    });
  };

  useEffect(() => {
    if (!lazy){
      setState({ 
        ...state,
        isdetected: true 
      });
      
      return;
    }
    imgRef.current?.addEventListener(IMAGE_LOAD_EVENT, handleDetectImage);

    return () => imgRef.current?.removeEventListener(IMAGE_LOAD_EVENT, handleDetectImage);
  }, [lazy, imgRef]);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, { threshold });
    }
    imgRef.current && state.isloaded && observer.observe(imgRef.current);
  }, [observer, imgRef, state.isloaded]);


  return (
    <ImageStyled 
      ref={imgRef}
      src={state.isdetected ? src : placeholder} 
      width={width} 
      height={height} 
      type={IMAGE_TYPES[type]} 
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

