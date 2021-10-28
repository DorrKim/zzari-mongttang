import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import PropTypes from 'prop-types';
import Profile from '@domains/UserProfile';


const PersonalPage = ({ myUserId = '61759164359c4371f68ac707', isAuthorized = true }) => {
  const { userId } = useParams();
  const [fetchState, fetchUserData] = useAxios(`/users/${userId}`);
  
  useEffect(() => {
    console.log(`isLogined: ${isAuthorized}`);
    fetchUserData();   
  }, []);
  
  const fetchSuccess = fetchState.value !== null; 
  const isMyPage = Boolean(myUserId === userId);
  
  return (
    <>
      {
        fetchSuccess
        && <Profile 
          fullName={fetchState.value.fullName} 
          followers={fetchState.value.followers}
          following={fetchState.value.following}
          src={fetchState.value.image}
          isMyProfile={isMyPage}>
        </Profile>
      } 
    </>
  );
};

PersonalPage.propTypes = {
  isAuthorized: PropTypes.bool,
  myUserId: PropTypes.string
};

export default PersonalPage;
