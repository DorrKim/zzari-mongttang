import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';

import ReactFreezeframe from 'react-freezeframe';
import colors from '@constants/colors';
import noImage from '@assets/no_img.png';
import Favorite from '@components/Favorite';
import { useHistory } from 'react-router';

const ZzalItem = ({
  postId,
  likes,
  imageUrl,
  noFavorite,
  ...props
}) => {
  const freeze = useRef();
  const history = useHistory();

  const onToDetailPage = useCallback(() => {
    history.push(`/zzal/${postId}`);
  }, [postId]);

  return (
    <ReactFreezeframe 
      ref={freeze} 
      options={{ trigger: 'hover' }}>
      <StyledItem>
        <Image
          src={imageUrl || noImage} 
          onClick={onToDetailPage}
          style={{ border: `2px solid ${colors.PRIMARY_LIGHT}`,
            zIndex: 1 }}
          {...props}>
        </Image>
        {!noFavorite
          ? <Favorite
            likes={likes}
            postId={postId}
            style={{ gap: '4px',
              position: 'absolute',
              top: '5%',
              right: '5%',
              zIndex: 3,
              margin: 5 }}
          />
          : null
        }   
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
  overflow: hidden;
  position: relative;
  &:hover {
    transition: all 0.2s ease-in;
  }
  @media(max-width: 768px) {
    width: 210px;
    height: 210px;
  }
  @media(max-width: 680px) {
    width: 152px;
    height: 152px;
  }
  @media(max-width: 375px) {
    width: 130px;
    height: 130px;
  }
`;

ZzalItem.propTypes = {
  postId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  likes: PropTypes.array,
  noFavorite: PropTypes.bool
};

export default ZzalItem;
