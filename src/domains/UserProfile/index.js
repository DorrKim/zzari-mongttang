import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useAxios from '@hooks/useAxios';

import ConfirmModal from '@domains/NotationModal/ConfirmModal';
import Avatar from '@components/Avatar';
import UserInfo from './UserInfo';
import FollowToggle from './FollowToggle';
import FollowContainer from './FollowContainer';
import { useAuthorization } from '@context/AuthorizationProvider';
import { useHistory } from 'react-router';


const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  @media(min-width: 1176px) {
    width: 994px;
    margin: 2rem auto;
  }
  @media(min-width: 680px) {
    justify-content:flex-start;
    margin: 2rem auto;
  }
  
`;

const StyledAvatar = styled(Avatar)`
  @media(min-width: 680px) {
    width: 240px;
    height: 240px;
  }
`;

const Profile = ({   
  fullName, 
  followers,
  following, 
  src, 
  userId
}) => {
  const history = useHistory();
  const { authState } = useAuthorization();
  const { isAuthorized, authToken, myUser } = authState;
  const { _id: myUserId, image: myUserImage, fullName: myUserName } = myUser;
  
  const headers = useMemo(() => {
    
    return {
      Authorization: `bearer ${authToken}`
    };
  }, [authToken]);

  const [countFollower, setcountFollower] = useState(followers.length);
  const [currFollowId, setCurrFollowId] = useState(() => {
    return followers.find(follow => follow.follower._id === myUserId)?._id;
  });
  const [visible, setVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState();
  
  const [unfollowData, fetchUnFollowData] = useAxios('/follow/delete', {
    method: 'delete',
    headers     
  }); 

  const [followData, fetchFollowData] = useAxios('/follow/create', {
    method: 'post',
    headers    
  });

  const isMyProfile = useMemo(() => myUserId === userId, [myUserId, userId]);

  const followState = useMemo(() => !!currFollowId, [currFollowId]);

  useEffect(() => {
    if (!isAuthorized) {
      setCurrFollowId(null);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (followData.value) {
      setCurrFollowId(followData.value._id);
      setcountFollower(prevState => prevState + 1);
    }
  }, [followData.value]);

  useEffect(() => {
    if (unfollowData.value) {  
      setcountFollower(prevState => prevState - 1);
    }
  }, [unfollowData.value]);

  const handleClickConfirm = useCallback(() => {
    setIsConfirmed(true);  
    setVisible(false);
  }, [setVisible]);

  const handleClickCancel = useCallback(() => {
    setIsConfirmed(false);  
    setVisible(false);
  }, [setVisible]);

  const handleClickUnFollow = useCallback(async () => { 
    if (currFollowId && isAuthorized) {

      await fetchUnFollowData({
        data: {
          id: currFollowId
        }
      });
      setCurrFollowId(null);  
    }
  }, [isAuthorized, currFollowId, fetchUnFollowData, setCurrFollowId]);

  const handleClickFollow = useCallback(async () => {
    if (!isAuthorized) {
      setVisible(true);
      isConfirmed && history.push('/login');
      
      return;
    }

    if (currFollowId) {
      return;
    }
    fetchFollowData({
      data: {
        userId
      }
    });
  }, [isAuthorized, userId, currFollowId, fetchFollowData]);

  const followToggleButton = (
    <FollowToggle 
      isMyProfile={isMyProfile} 
      followState={followState} 
      handleClickFollow={handleClickFollow}
      handleClickUnFollow={handleClickUnFollow}/>
  );

  const followContainer = (
    <FollowContainer
      followers={followers} 
      following={following} 
      followState={followState} 
      myUserImage={myUserImage} 
      myUserName={myUserName}
      countFollower={countFollower} 
      countFollowing={following.length}  
    />
  );

  return (
    <>
      <ProfileWrapper>
        <StyledAvatar 
          src={src} 
          size={120}
        />
        <UserInfo 
          fullName={fullName} 
          followContainer={followContainer}
          followToggleButton={followToggleButton} 
        /> 
      </ProfileWrapper>
      <ConfirmModal
        title='로그인이 필요해요!'
        description='이 서비스는 로그인이 필요한 서비스입니다. 로그인하시겠습니까?'
        visible={visible}
        handleClickConfirm={handleClickConfirm}
        handleClickCancel={handleClickCancel} >
      </ConfirmModal>
    </>
  );
};

Profile.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array.isRequired,
  src: PropTypes.string,
  userId: PropTypes.string
};

export default Profile;
