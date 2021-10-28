import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useSessionStorage from '@hooks/useSessionStorage';

const AuthorizationContext = React.createContext();

export const useAuthorization = () => useContext(AuthorizationContext);

const AuthorizationProvider = ({ children }) => {
  const [authState, setAuthState] = useSessionStorage('auth', {
    isAuthorized: false,
    authToken: '',
    myUserId: ''
  });

  const updateAuthState = useCallback(({ authToken, myUserId }) => {
    if (!authToken || !myUserId) {
      console.error('cannot updateAuthState without authToken or myUserId!');

      return; 
    }
    
    setAuthState({
      isAuthorized: true,
      authToken,
      myUserId
    });
  }, []);

  const clearAuthState = useCallback(() => {
    setAuthState({
      isAuthorized: false,
      authToken: '',
      myUserId: ''
    });
  }, []);

  return <AuthorizationContext.Provider 
    value={{ 
      authState,
      updateAuthState,
      clearAuthState
    }}>
    {children}
  </AuthorizationContext.Provider>;
};

AuthorizationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default AuthorizationProvider;
