import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import useSessionStorage from '@hooks/useSessionStorage';

const AuthorizationContext = React.createContext();

export const useAuthorization = () => useContext(AuthorizationContext);

const AuthorizationProvider = ({ children }) => {
  const [authState, setAuthState] = useSessionStorage('auth', {
    isAuthorized: false,
    authToken: '',
    myUser: {}
  });

  const updateAuthState = useCallback(({ authToken, myUser }) => {
    if (!authToken || !myUser) {
      console.error('cannot updateAuthState without authToken or myUser!');

      return; 
    }

    setAuthState({
      isAuthorized: true,
      authToken,
      myUser
    });
  }, []);

  const clearAuthState = useCallback(() => {
    setAuthState({
      isAuthorized: false,
      authToken: '',
      myUser: {}
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
