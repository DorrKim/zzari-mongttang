import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import ReactFreezeframe from 'react-freezeframe';
import colors from '@constants/colors';
import noImage from '@assets/no_img.png';
import Favorite from '@components/Favorite';
import useToggle from '@hooks/useToggle';
import { useAuthorization } from '@context/AuthorizationProvider';
import useAxios from '@hooks/useAxios';

const ZzalItem = ({
  postId,
  likes,
  imageUrl,
  ...props
}) => {
  const history = useHistory();
  const freeze = useRef();

  const { authState: { isAuthorized, myUser, authToken }} = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `Bearer ${authToken}` }), [authToken]);

  const [isFavoriteToggled, handleToggleFavorite] = useToggle(likes.some(({ user }) => user === myUser._id));
  const [likeCount, setLikeCount] = useState(likes.length);
  const [myLikesId, setMyLikesId] = useState(likes.find(({ user }) => user === myUser._id)?._id);

  const [postFavoriteAPIState, postFavorite] = useAxios('/likes/create', {
    method: 'post'
  });
  const [deleteFavoriteAPIState, deleteFavorite] = useAxios('/likes/delete', {
    method: 'delete'
  });

  const onToDetailPage = useCallback(() => {
    history.push(`/zzal/${postId}`);
  }, [postId]);

  const handleClickFavorite = useCallback(() => {
    if (!isAuthorized) {
      confirm('로그인이 필요한 기능입니다! 로그인 페이지로 이동하시겠습니까?') && history.push('/login');

      return;
    }
    isFavoriteToggled
      ? (
        deleteFavorite({
          headers,
          data: {
            id: myLikesId
          }
        }), 
        setLikeCount(likeCount => likeCount - 1),
        setMyLikesId(null)
      )
      : (
        postFavorite({
          headers,
          data: {
            postId
          }
        }), 
        setLikeCount(likeCount => likeCount + 1)
      );
    handleToggleFavorite();
  }, [isAuthorized, isFavoriteToggled, headers, myLikesId, postId, deleteFavorite, postFavorite]);

  useEffect(() => {
    const { error } = deleteFavoriteAPIState;
    if (error) {
      console.error(error);

      return;
    }
  }, [deleteFavoriteAPIState]);

  useEffect(() => {
    const { error, value } = postFavoriteAPIState;
    if (error) {
      console.error(error);

      return;
    }

    value && setMyLikesId(value._id);
  }, [postFavoriteAPIState]);

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
        <Favorite
          onClick={handleClickFavorite} 
          number={likeCount}
          isToggled={isAuthorized ? isFavoriteToggled : false}
        />
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
  postId: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  likes: PropTypes.array
};

export default ZzalItem;
