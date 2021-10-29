import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import ReactFreezeframe from 'react-freezeframe';
import colors from '@utils/constants/colors';
import noImage from '@assets/no_img.png';
import Favorite from '@components/Favorite';

const ZzalItem = ({
  id,
  imageUrl = '',
  number,
  ...props
}) => {
  const history = useHistory();
  const freeze = useRef();

  const onToDetailPage = useCallback(() => {
    history.push(`/zzal/${id}`);
  });


  const StyledFavorite = styled.div`
    position: absolute;
    top: 5%;
    left: 85%;
    z-index: 10;
  `;
  
  return (
    <ReactFreezeframe 
      ref={freeze} 
      options={{ trigger: 'hover' }}>
      <StyledItem>
        <Image 
          src={imageUrl || noImage} 
          onClick={onToDetailPage}
          style={{ border: `2px solid ${colors.PRIMARY_LIGHT}`,
            'z-index': 1 }}
          {...props}>
        </Image>
        <StyledFavorite>
          <Favorite 
            number={number}
          />
        </StyledFavorite>
      </StyledItem>
    </ReactFreezeframe>
  );
};

const StyledItem = styled.div`
  display: flex;
  width: 240px;
  height: 240px;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  object-fit: contain;
  overflow: hidden;
  &:hover {
    transition: all 0.2s ease-in;
  }
  position: relative;
`;

ZzalItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default ZzalItem;
