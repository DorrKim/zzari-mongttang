import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Text from '@base/Text';
import Flex from '@base/Flex';
import Button from '@base/Button';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import { useAuthorization } from '@context/AuthorizationProvider';
import ProfileButton from './ProfileButton';
import LoginConfirmModal from '@domains/NotationModal/LoginConfirmModal';

const HeaderStyled = styled.header`
padding: 0 16px;
`;

const Header = ({ ...props }) => {
  const history = useHistory();
  const { authState } = useAuthorization();
  const { isAuthorized } = authState;
  const [isLoginModalShow, setIsLoginModalShow] = useState(false);
  
  const handleToUploadPage = useCallback(() => {
    if (!isAuthorized) {
      setIsLoginModalShow(true);
      
      return;
    }

    history.push('/upload');
  }, [isAuthorized]);

  const handleToLoginPage = useCallback(() => {
    history.push('/login');
  }, [history]);


  return (
    <>
      <HeaderStyled {...props}>
        <Flex alignItems='center' justifyContent='flex-end' style={{ gap: 16 }}>
          <Logo link style={{ marginRight: 'auto' }} />
          <HeaderButton 
            backgroundColor={colors.PRIMARY_BACKGROUND}
            onClick={handleToUploadPage}
          > 
            <Text bold color={colors.PRIMARY}>글 작성</Text> 
          </HeaderButton>
          {isAuthorized
            ? <ProfileButton myUser={authState.myUser} />
            : <HeaderButton 
              backgroundColor={colors.PRIMARY}
              onClick={handleToLoginPage}
            >
              <Text bold color={colors.PRIMARY_BACKGROUND}>로그인</Text>
            </HeaderButton>  
          }
        </Flex>
      </HeaderStyled>
      <LoginConfirmModal
        visible={isLoginModalShow}
        handleClickConfirm={handleToLoginPage}
        handleClickCancel={() => setIsLoginModalShow(false)} />
    </>
  );
};

const HeaderButton = styled(Button)`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 4px;
`;

// 임시
Header.propTypes = {
  isAuthorized: PropTypes.bool
};


export default Header;
