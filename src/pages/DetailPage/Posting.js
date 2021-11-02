import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Image from '@base/Image';
import Text from '@base/Text';
import AlertModal from '@domains/NotationModal/AlertModal';
import Avatar from '@components/Avatar';
import colors from '@constants/colors';


const PostingWrapper = styled.div`
  position: relative;
  margin-top: 20px;
`;

const AvatarContainer = styled.div`
  position: absolute; 
  left: -60px;
  top: 0px;
`;

const AuthorName = styled(Text)`
  margin: 10px 0;
`;

const CopyButton = styled.button`
  border: 0;
  outline: 2px solid ${colors.ACCENT};
  padding: 0;
  color: ${colors.ACCENT};
  width: 100%;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 700;
  background-color: transparent;
  position: relative;
  &:hover {
    filter: brightness(95%);
    color: white;
  ::after {
      content: '';
      background-color: ${colors.ACCENT};
      mix-blend-mode: overlay;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      animation: grow .6s ease-in-out forwards;
  }
}
  &:active {
    animation: squash .3s forwards ease-in;
}
@keyframes squash {
      40% {
        transform: scale(.95);
      }
      60% {
        transform: scale(1.05);
      }
      100% {
      transform: scale(1); 
      }
}
@keyframes grow {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
`;

const Posting = ({ 
  postingInfos, 
  visible, 
  handleClickCopy,
  handleClose }) => {
  
  return (
    <>
      <PostingWrapper>
        <AvatarContainer>
          <Avatar
            src={postingInfos.author.image} 
            size='48px' />
        </AvatarContainer>
        <AuthorName bold>{postingInfos.author.fullName}</AuthorName>
        <Image 
          src={postingInfos.image 
            ? postingInfos.image 
            : ''}
          width='100%'
          height='content-fit'/>
      </PostingWrapper>
      <CopyButton onClick={handleClickCopy}>복사</CopyButton>
      <Text> {postingInfos.title} </Text>
      <AlertModal
        title='Copied'
        description='이미지 URL이 복사되었습니다'
        visible={visible}
        handleClose={handleClose}/>
    </>
  );
};

Posting.propTypes = {
  postingInfos: PropTypes.object,
  visible: PropTypes.bool,
  handleClickCopy: PropTypes.func,
  handleClose: PropTypes.func
};

export default Posting;
