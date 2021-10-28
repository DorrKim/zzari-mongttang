import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import ReactFreezeframe from 'react-freezeframe';
import colors from '@utils/constants/colors';

const ZzalItem = ({
  id,
  imageUrl = '',
  ...props
}) => {
  const history = useHistory();
  const freeze = useRef();

  const onToDetailPage = useCallback(() => {
    history.push(`/zzal/${id}`);
  });

  return (
    <ReactFreezeframe 
      ref={freeze} 
      options={{ trigger: 'hover' }}>
      <StyledItem>
        <Image 
          src={imageUrl} 
          onClick={onToDetailPage}
          style={{ border: `2px solid ${colors.PRIMARY_LIGHT}` }}
          {...props}>
        </Image>
      </StyledItem>
    </ReactFreezeframe>
  );
};

const StyledItem = styled.div`
  display: flex;
  width: 152px;
  height: 152px;
  padding: 8px;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  &:hover img {
    transform: scale(1.8);        
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);  
    transition: all 0.2s ease-in;
  }
`;

ZzalItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default ZzalItem;
