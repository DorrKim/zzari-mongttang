import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Flex from './Flex';
import reactDom from 'react-dom';

import { useViewPort } from '@context/ViewPortProvider';

const BackgroundScreen = styled.div`
  display: flex;
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;


const ModalContainer = styled(Flex)`
  position: fixed;
  visibility: hidden; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(.6);
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  
  transition: .1s ease-in;

  &.active {
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
    transition: .2s cubic-bezier(.5,1.75,.5,1.75);
  }
`;


const Modal = ({ 
  children, 
  width, 
  height,
  visible = false,
  onClose,
  ...props
}) => {
  const deviceType = useViewPort();

  const defaultWidth = {
    mobile: 300,
    tablet: 400,
    web: 500
  };
  const modalWidth = width || defaultWidth[deviceType];

  const containerStyle = useMemo(() => ({
    width: modalWidth,
    height
  }), [modalWidth, height]); 
  const el = useMemo(() => document.createElement('div'), []);

  const stopPropagation = useCallback(e => {
    e.stopPropagation();
  }, []);
    
  useEffect(() => {
    document.body.appendChild(el);
  
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);
  
  return reactDom.createPortal(
    <BackgroundScreen 
      justifyContent='center' 
      alignItems='center'
      visible={visible}
      onClick={onClose}>
      <ModalContainer
        column
        justifyContent='center' 
        alignItems='center'
        className={visible ? 'active' : ''} 
        style={{ 
          ...props.style,
          ...containerStyle
        }}
        onClick={stopPropagation}
        {...props}
      >
        {children}
      </ModalContainer>
    </BackgroundScreen>,
    el);
};

Modal.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object
};

export default Modal;
