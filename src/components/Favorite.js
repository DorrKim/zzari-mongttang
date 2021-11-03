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
import LoginConfirmModal from '@domains/NotationModal/LoginConfirmModal';

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
  const [isLoginModalShow, setIsLoginModalShow] = useState(false);

  const [postFavoriteAPIState, postFavorite] = useAxios('/likes/create', {
    method: 'post'
  });
  const [deleteFavoriteAPIState, deleteFavorite] = useAxios('/likes/delete', {
    method: 'delete'
  });

  const handleClickFavorite = useCallback(() => {
    if (!isAuthorized) {
      setIsLoginModalShow(true);

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

  const handleToLoginPage = useCallback(() => {
    history.push('/login');
  }, [history]);

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
    <>
      <FavoriteContainer {...props}>
        <IconStyled 
          name={isToggled ? 'filledHeart' : 'heart'} 
          onClick={handleClickFavorite} 
          toggled={isToggled}
        >
        </IconStyled>
        <Number value={likeCount}></Number>
      </FavoriteContainer>
      <LoginConfirmModal
        visible={isLoginModalShow}
        handleClickConfirm={handleToLoginPage}
        handleClickCancel={() => setIsLoginModalShow(false)} />
    </>
  );
};

const IconStyled = styled(Icon)`
${({ toggled }) => toggled 
    ? ({ 
      color: colors.ACCENT,
      opacity: 1 
    })
    : ({ 
      color: colors.TEXT_NORMAL
    })
}
cursor: pointer;
margin-right: 6px;
flex-shrink: 0;
transition: 0.1s ease-in;
&:hover {
  animation: bounce .5s ease-in-out infinite;
}

@keyframes bounce {
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
`;

Favorite.propTypes = {
  likes: PropTypes.array,
  postId: PropTypes.string,
  onClick: PropTypes.func,
  isToggled: PropTypes.bool
};


export default Favorite;
