import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@/components/base/Flex';
import Text from '@components/base/Text';
import Button from '@/components/base/Button';
import colors from '@/utils/constants/colors';
import styled from '@emotion/styled';

const UserInfoWrapper = styled(Flex)`
  width: 160px;
  margin-left: 16px;
`;

const UserInfo = ({ fullName, followers = [], following = [] }) => {
  return (
    <UserInfoWrapper column alignItems='center' justifyContent='space-between'>
      <Text bold size='lg' style={{ 
        height: '32px',
        lineHeight: '32px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '160px',
        margin: '8px 16px' }}>
        {fullName}
      </Text>
      <Flex justifyContent="center" style={{ width: '100%',
        marginBottom: '8px' }}>
        <Flex column alignItems='center' style={{ margin: '0 8px' }}>
          <Text bold >{`${followers.length}`}</Text>
          <Text bold size="sm" >팔로워</Text>
        </Flex> 
        <Flex column alignItems='center' style={{ margin: '0 8px' }}>
          <Text bold>{`${following.length}`}</Text>
          <Text bold size="sm">팔로잉</Text>
        </Flex>
      </Flex>

      <Button backgroundColor={colors.ACCENT} width='80%' height={32} borderRadius='.25rem' borderWidth={0} style={{ padding: 0 }}>
        <Text bold color="white">팔로우</Text>
      </Button>
    </UserInfoWrapper>
  );
};

UserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array
};

export default UserInfo;
