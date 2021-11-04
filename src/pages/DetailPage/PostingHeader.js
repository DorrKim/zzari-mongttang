import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Icon from '@base/Icon';
import Text from '@base/Text';
import Avatar from '@components/Avatar';
import ConfirmModal from '@domains/NotationModal/ConfirmModal';
import Favorite from '@components/Favorite';
import Number from '@components/Number';
import colors from '@constants/colors';

const PostingHeader = ({ myUser, postingInfos,
  handleClickEditPost, confirmVisible, handleClickConfirm, handleClickCancel,
  handleClickRemovePosting, removeVisible,
  handleClickRemoveConfirm, handleClickRemoveCancel,
  handleShowComment }) => {
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  const handleClickProfile = () => {
    history.push(`/user/${postingInfos.author._id}`);
  };

  return (
    <>
      <StyledWrapper>
        <div>
          <Icon
            style={{ transform: 'scaleX(1.5) scaleY(1.5)', 
              backgroudColor: colors.PRIMARY_BACKGROUND,
              cursor: 'pointer' }}
            name={'arrowBack'}
            onClick={handleClickBack}
          />
        </div>
        <Text bold style={{ 
          fontSize: '20px',
          margin: '0 20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '22px',
          lineHeight: '26px'
        }}>
          {postingInfos.title}
        </Text>
        <IconsWrapper inVisible={myUser._id !== postingInfos.author._id}>
          <StyledIcon
            name={'edit'}
            color={colors.ACCENT}
            onClick={handleClickEditPost}
          ></StyledIcon>
          <ConfirmModal
            title='알림'
            description='포스트 수정 페이지로 이동하시겠습니까?'
            visible={confirmVisible}
            handleClickConfirm={handleClickConfirm}
            handleClickCancel={handleClickCancel} 
          >
          </ConfirmModal>
          <StyledIcon
            name={'remove'}
            color={'red'}
            style={{ filter: 'brightness(70%)' }}
            onClick={handleClickRemovePosting}
          ></StyledIcon>
          <ConfirmModal
            title='삭제'
            description='포스트를 삭제하시겠습니까??'
            visible={removeVisible}
            handleClickConfirm={handleClickRemoveConfirm}
            handleClickCancel={handleClickRemoveCancel} 
          >
          </ConfirmModal>
        </IconsWrapper>
      </StyledWrapper>
      <PostingHeaderWrapper>
        <MainContainer>
          <AvatarContainer>
            <Avatar
              onClick={handleClickProfile}
              src={postingInfos.author.image}
              fullName={postingInfos.author.fullName} 
              size='56px'
            />
            <AuthorName>{postingInfos.author.fullName}</AuthorName>
          </AvatarContainer>
          <Container
          >
            <IconsContainer>
              <IconsWrapper>
                <Favorite
                  likes={postingInfos.likes}
                  postId={postingInfos._id}
                />
                <CommentIcon>
                  <StyledComment
                    name='comment'
                    onClick={handleShowComment}
                  ></StyledComment>
                  <Number
                    value={postingInfos.comments.length} 
                  />
                </CommentIcon>
              </IconsWrapper>
            </IconsContainer>
          </Container>
        </MainContainer>  
      </PostingHeaderWrapper>
    </>
  );
};

const StyledComment = styled(Icon)`
  margin: 0 6px;
  cursor: pointer;
`;

const PostingHeaderWrapper = styled.div`
  margin: 10px 0 3px 0;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthorName = styled(Text)`
  margin: 10px 5px;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 24px;
`;

const IconsWrapper = styled.div`
  display: ${({ inVisible }) => inVisible ? 'none' : 'flex'};
  gap: 5px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

const IconsContainer = styled.div`
  display: flex;
  padding: 5px 0;
`;

const CommentIcon = styled.div`
  display:flex;
`;

const Container = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`;

PostingHeader.propTypes = {
  postingInfos: PropTypes.object,
  visible: PropTypes.bool,
  handleClickCopy: PropTypes.func,
  handleClose: PropTypes.func,
  myUser: PropTypes.object,
  confirmVisible: PropTypes.bool,
  removeVisible: PropTypes.bool,
  handleClickEditPost: PropTypes.func,
  handleClickConfirm: PropTypes.func,
  handleClickCancel: PropTypes.func,
  handleClickRemovePosting: PropTypes.func,
  handleClickRemoveConfirm: PropTypes.func,
  handleClickRemoveCancel: PropTypes.func,
  handleShowComment: PropTypes.func
};

export default PostingHeader;
