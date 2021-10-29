import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Divider from '@base/Divider';
import MenuBarContainer from '@domains/MenuBar/MenuBarContainer';
import MenuBarItem from '@domains/MenuBar/MenuBarItem';
import colors from '@constants/colors';
import { useAuthorization } from '@context/AuthorizationProvider';

const MenuBar = ({ ...props }) => {
  const { authState, clearAuthState } = useAuthorization();
  const history = useHistory();

  const { myUser } = authState;

  return (
    <MenuBarContainer {...props}>
      <MenuBarItem onClick={
        myUser?._id ? () => history.push(`/user/${myUser._id}`) : null}>
                  개인 페이지
      </MenuBarItem>
      <MenuBarItem onClick={() => history.push('/editProfile')}>
                  정보 수정
      </MenuBarItem>
      <Divider color={colors.PRIMARY_BACKGROUND} />
      <MenuBarItem onClick={clearAuthState}>
                  로그아웃
      </MenuBarItem>
    </MenuBarContainer>
  );
};

MenuBar.propTypes = {
  userId: PropTypes.string
};

export default MenuBar;
