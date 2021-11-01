import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Flex from './Flex';
import reactDom from 'react-dom';


const BackgroundScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;


const ModalContainer = styled(Flex)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;


const Modal = ({ 
  children, 
  width = 500, 
  height,
  visible = false,
  onClose,
  ...props
}) => {
  const containerStyle = useMemo(() => ({
    width,
    height
  }), [width, height]); 
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
      style={{ display: visible ? 'flex' : 'none' }}
      onClick={onClose}>
      <ModalContainer
        justifyContent='center' 
        alignItems='center' 
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
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  style: PropTypes.object
};

export default Modal;
