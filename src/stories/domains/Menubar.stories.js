import React from 'react';

import { MenuBarContainer, MenuBarItem } from '@domains/MenuBar';
import Divider from '@base/Divider';
import colors from '@constants/colors';


export default {
  title: 'Domains/Menubar'
};

export const Default = () => (
  <MenuBarContainer>
    <MenuBarItem onClick={() => alert('to 개인 페이지!')}>
    개인 페이지
    </MenuBarItem>
    <MenuBarItem onClick={() => alert('to 정보수정 페이지!')}>
    정보 수정
    </MenuBarItem>
    <Divider color={colors.PRIMARY_BACKGROUND} />
    <MenuBarItem onClick={() => alert('로그아웃!')}>
    로그아웃
    </MenuBarItem>

  </MenuBarContainer>);
