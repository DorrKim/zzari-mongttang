import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';

import Text from '@base/Text';
import Flex from '@base/Flex';
import Button from '@base/Button';
import Logo from '@components/Logo';
import colors from '@constants/colors';
import Avatar from '@components/Avatar';
import MenuBar from '@domains/MenuBar';
import useToggle from '@hooks/useToggle';
import useClickAway from '@hooks/useClickAway';
// Sample Image
import imageSrc from '@assets/test.gif';

const HeaderStyled = styled.header`
padding: 0 16px;
`;

const Header = ({ isAuthorized, ...props }) => {
  const [showMenuBar, toggleMenuBar] = useToggle(false);
  const avatarRef = useRef(null);
  const history = useHistory();
  const menuBarRef = useClickAway(e => {
    if (e.path.includes(avatarRef.current) || !showMenuBar) {

      return;
    }

    toggleMenuBar();
  });
  
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

  const handleAvatarClick = useCallback(() => {
    toggleMenuBar();
  }, [showMenuBar, toggleMenuBar]);

  return (
    <HeaderStyled {...props}>
      <Flex alignItems='center' justifyContent='flex-end' style={{ gap: 16 }}>
        <Logo link style={{ marginRight: 'auto' }} />
        <Button 
          width={70} height={40} 
          backgroundColor={colors.PRIMARY_BACKGROUND}
          borderColor={colors.PRIMARY}
          borderWidth='0' 
          borderRadius='4px'
          onClick={handleToUploadPage}
        > 
          <Text bold color={colors.PRIMARY}>글 작성</Text> 
        </Button>
        {isAuthorized
          ? (
            <div ref={avatarRef} style={{ position: 'relative' }}>
              <Avatar src={imageSrc} size={45} onClickCapture={handleAvatarClick} />
              <div ref={menuBarRef}>
                {showMenuBar 
                  ? (
                    <MenuBar />
                  )
                  : null}
              </div>
            </div>
          )
          : (
            <Button 
              width={70} height={40} 
              backgroundColor={colors.PRIMARY}
              borderWidth='0' 
              borderRadius='4px' 
              onClick={handleToLoginPage}
            >
              <Text bold color={colors.PRIMARY_BACKGROUND}>로그인</Text>
            </Button>
          )
        }
      </Flex>
    </HeaderStyled>
  );
};

// 임시
Header.propTypes = {
  isAuthorized: PropTypes.bool
};


export default Header;
