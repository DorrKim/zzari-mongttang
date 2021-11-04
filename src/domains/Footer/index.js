import React from 'react';

import styled from '@emotion/styled';
import Text from '@base/Text';
import colors from '@constants/colors';


const Footer = () => {
  return (
    <StyledFooter>
      <Text size='sm' color='gray'>세상의 짤들을 모두 모아 - 짤이몽땅
        <br/>
      Programmers dev.course FE team_zzmrrp | <Link href='https://github.com/prgrms-fe-devcourse/FEDC1_Zzari-Mongttang_Gidong1'>Github Repo</Link>
      </Text>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: fixed;
  width: 100vw;
  margin: 0 auto;
  bottom: 10px;
  text-align: center;
`;

const Link = styled.a`
  color: ${colors.ACCENT};
  text-decoration: none;
  &:visited {
    color: ${colors.ACCENT};
  }
`;

export default Footer;
