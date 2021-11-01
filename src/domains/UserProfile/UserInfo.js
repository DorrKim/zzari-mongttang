import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Flex from '@base/Flex';
import Text from '@base/Text';

const UserInfoWrapper = styled(Flex)`
  ${'' /* position: relative; */}
  margin-left: 1rem;
  ${'' /* @media(min-width: 680px) {
    justify-content: center;
    margin-left: 2.5rem;
  } */}
`;

const UserName = styled(Text)`
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media(min-width: 680px) {
    margin: 1.5rem 0;
    font-size: 3rem;
    line-height: 3rem;
    height: 3rem;
  }
`;

const UserInfo = ({ 
  fullName, 
  followContainer,
  followToggleButton
}) => {
  
  return (
    <>
      <UserInfoWrapper column justifyContent='space-between'>
        <UserName bold size='lg' >
          {fullName}
        </UserName>
        {followContainer}
        {followToggleButton}
      </UserInfoWrapper>
    </>
  );
};

UserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  followContainer: PropTypes.element.isRequired,
  followToggleButton: PropTypes.element.isRequired
};

export default UserInfo;
