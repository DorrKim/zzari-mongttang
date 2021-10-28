import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import PropTypes from 'prop-types';
import Profile from '@domains/UserProfile';


const PersonalPage = ({ isAuthorized = true }) => {
  const { userId } = useParams();
  const [fetchState, fetchUserData] = useAxios(`/users/${userId}`);
  

  useEffect(async () => {
    console.log(`isLogined: ${isAuthorized}`);
    fetchUserData();
  }, [fetchUserData]);

  const fetchSuccess = useMemo(() => Boolean(fetchState.value !== null), [fetchState.value]);
  
  return (
    <>
      {
        fetchSuccess
        && <Profile 
          fullName={fetchState.value.fullName} 
          followers={fetchState.value.followers}
          following={fetchState.value.following}
          src={fetchState.value.image}
          userId={userId}>
        </Profile>
      } 
     
    </>
  );
};

PersonalPage.propTypes = {
  isAuthorized: PropTypes.bool
};

export default PersonalPage;
