import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Icon from '@components/base/Icon';
import Number from '@components/Number';
import colors from '@constants/colors';
import useToggle from '@hooks/useToggle';
import { useAuthorization } from '@context/AuthorizationProvider';
import { useHistory } from 'react-router';
import useAxios from '@hooks/useAxios';

const FavoriteContainer = styled.div`
  display: flex;
  width: 40px;
  justify-content: flex-end;
  opacity: 1;
  svg:hover  {
    fill: ${colors.ACCENT};
  }
`;

const Favorite = ({ likes, postId, ...props }) => {
  const history = useHistory();
  const { authState: { isAuthorized, myUser, authToken }} = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `Bearer ${authToken}` }), [authToken]);

  const [isToggled, toggle] = useToggle(likes.some(({ user }) => user === myUser._id));
  const [likeCount, setLikeCount] = useState(likes.length);
  const [myLikesId, setMyLikesId] = useState(likes.find(({ user }) => user === myUser._id)?._id);

  const [postFavoriteAPIState, postFavorite] = useAxios('/likes/create', {
    method: 'post'
  });
  const [deleteFavoriteAPIState, deleteFavorite] = useAxios('/likes/delete', {
    method: 'delete'
  });

  const handleClickFavorite = useCallback(() => {
    if (!isAuthorized) {
      confirm('로그인이 필요한 기능입니다! 로그인 페이지로 이동하시겠습니까?') && history.push('/login');

      return;
    }
    isToggled
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
    toggle();
  }, [isAuthorized, isToggled, headers, myLikesId, postId, deleteFavorite, postFavorite]);


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


  const toggledStyle = {
    color: colors.ACCENT,
    opacity: 1,
    flexShrink: 0,
    marginRight: 6,
    cursor: 'pointer'
  };

  const unToggledStyle = {
    color: colors.TEXT_NORMAL,
    opacity: 0.5,
    flexShrink: 0,
    marginRight: 6,
    cursor: 'pointer'
  };

  return (
    <>
      <FavoriteContainer {...props}>
        <Icon 
          name={isToggled ? 'filledHeart' : 'heart'} 
          onClick={handleClickFavorite} 
          style={isToggled ? { ...toggledStyle } : { ...unToggledStyle }}
        >
        </Icon>
        <Number value={likeCount}></Number>
      </FavoriteContainer>
    </>
  );
};

Favorite.propTypes = {
  likes: PropTypes.array,
  postId: PropTypes.string,
  onClick: PropTypes.func,
  isToggled: PropTypes.bool
};


export default Favorite;
