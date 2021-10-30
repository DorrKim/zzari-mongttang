import React, { useRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import ReactFreezeframe from 'react-freezeframe';
import colors from '@utils/constants/colors';
import noImage from '@assets/no_img.png';
import Favorite from '@components/Favorite';
import { favoriteAPI } from '@api/favoriteAPI';
import useToggle from '@hooks/useToggle';

const ZzalItem = ({
  id,
  imageUrl = '',
  number,
  ...props
}) => {
  const history = useHistory();
  const freeze = useRef();

  const [isToggled, handleToggle] = useToggle();
  const [likeCount, setLikeCount] = useState(number);
  const [likesId, setLikesId] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');

  const onToDetailPage = useCallback(() => {
    history.push(`/zzal/${id}`);
  });

  const handleClick = async () => { 
    handleToggle();
    // Todo : 받아왔을때 좋아요 이미 되어있는지 validation
    if (!isToggled) {
      setUpperLimit(upperLimit + 1);
      const response = await favoriteAPI.postFavorite(id);
      setLikesId(response._id);
    } else {
      setLowerLimit(lowerLimit + 1);
      await favoriteAPI.deleteFavorite(likesId);
    }
    
    isToggled ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  };

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
            'zIndex': 1 }}
          {...props}>
        </Image>
        <StyledFavorite>
          <Favorite
            onClick={handleClick} 
            number={likeCount}
            isToggled={isToggled}
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
