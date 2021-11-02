import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Icon from '@base/Icon';
import Text from '@base/Text';
import Avatar from '@components/Avatar';

const PostingHeaderWrapper = styled.div`

`;

const AvatarContainer = styled.div`

`;

const AuthorName = styled(Text)`
  margin: 10px 0;
`;

// const PostingHeaderWrapper = styled.div`
//   position: relative;
//   margin-top: 20px;
// `;

// const AvatarContainer = styled.div`
//   position: absolute; 
//   left: -60px;
//   top: 0px;
// `;

// const AuthorName = styled(Text)`
//   margin: 10px 0;
// `;

const PostingHeader = ({ postingInfos }) => {
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <>
      <PostingHeaderWrapper>
        <AvatarContainer>
          <Avatar
            src={postingInfos.author.image} 
            size='48px' />
          <AuthorName bold>{postingInfos.author.fullName}</AuthorName>
        </AvatarContainer>
        <Icon fontSize={'45px'} name={'arrowBack'} onClick={handleClickBack}/>
        <Text> {postingInfos.title} </Text>
      </PostingHeaderWrapper>
    </>
  );
};

PostingHeader.propTypes = {
  postingInfos: PropTypes.object,
  visible: PropTypes.bool,
  handleClickCopy: PropTypes.func,
  handleClose: PropTypes.func
};

export default PostingHeader;
