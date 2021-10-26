import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Divider from '@base/Divider';
import MenuBarContainer from '@domains/MenuBar/MenuBarContainer';
import MenuBarItem from '@domains/MenuBar/MenuBarItem';
import colors from '@constants/colors';

const MenuBar = ({ userId, ...props }) => {
  const history = useHistory();

  return (
    <MenuBarContainer {...props}>
      <MenuBarItem onClick={() => history.push(`/user/${userId}`)}>
                  개인 페이지
      </MenuBarItem>
      <MenuBarItem onClick={() => history.push('/editProfile')}>
                  정보 수정
      </MenuBarItem>
      <Divider color={colors.PRIMARY_BACKGROUND} />
      <MenuBarItem onClick={() => alert('로그아웃!')}>
                  로그아웃
      </MenuBarItem>
    </MenuBarContainer>
  );
};

MenuBar.propTypes = {
  userId: PropTypes.string.isRequired
};

export default MenuBar;
