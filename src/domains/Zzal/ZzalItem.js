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
    <ReactFreezeframe ref={freeze}>
      <StyledItem>
        <Image
          src={imageUrl || noImage} 
          onClick={onToDetailPage}
          style={{ zIndex: 1 }}
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
  width: 229px;
  height: 229px;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 3px 3px ${colors.PRIMARY_BACKGROUND};

  &:hover img {
    border: 4px solid ${colors.PRIMARY_BRIGHT};
  }
  
  @media(max-width: 1012px) {
    width: calc((100vw - 64px) / 4);
    height: calc((100vw - 64px) / 4);
  }

  @media(max-width: 768px) {
    width: calc((100vw - 56px) / 3);
    height: calc((100vw - 56px) / 3);
  }

  @media(max-width: 590px) {
    width: calc((100vw - 12px) / 2);
    height: calc((100vw - 12px) / 2);
  } 
`;

ZzalItem.propTypes = {
  postId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  likes: PropTypes.array,
  noFavorite: PropTypes.bool
};

export default ZzalItem;
