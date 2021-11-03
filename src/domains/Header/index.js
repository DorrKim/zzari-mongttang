import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Text from '@base/Text';
import Button from '@base/Button';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import { useAuthorization } from '@context/AuthorizationProvider';
import ProfileButton from './ProfileButton';

const Header = ({ ...props }) => {
  const history = useHistory();
  const { authState } = useAuthorization();
  const { isAuthorized } = authState;
  
  const handleToUploadPage = useCallback(() => {
    if (!isAuthorized) {
      confirm('해당 기능을 이용하기 위해서 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?') && history.push('/login');

      return;
    }

    history.push('/upload');
  }, [isAuthorized]);

  const handleToLoginPage = useCallback(() => {
    !isAuthorized && history.push('/login');
  }, [isAuthorized]);


  return (
    <HeaderStyled {...props}>
      <Logo link style={{ marginRight: 'auto' }} />
      <HeaderButton 
        backgroundColor={colors.PRIMARY_BACKGROUND}
        onClick={handleToUploadPage}
      > 
        <Text style={{ whiteSpace: 'nowrap' }} bold color={colors.PRIMARY}>글 작성</Text> 
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
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16;
  width: 994px;
  margin: 0 auto;
  padding: 8px 16px;

  @media(max-width: 1024px) {
    width: 100vw;
  }
`;

const HeaderButton = styled(Button)`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 4px;
  margin-right: 6px;
`;

// 임시
Header.propTypes = {
  isAuthorized: PropTypes.bool
};


export default Header;
