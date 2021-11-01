import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useMemo } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';

import Icon from '@components/base/Icon';
import { useAuthorization } from '@context/AuthorizationProvider';
import Comment from '@domains/Comment';
import Favorite from '@components/Favorite';
import AlertModal from '@domains/NotationModal/AlertModal';
import ConfirmModal from '@domains/NotationModal/ConfirmModal';
import Text from '@base/Text';
import Posting from './Posting';
import colors from '@constants/colors';
import Number from '@components/Number';

const CopyButton = styled.button`
  border: 1px solid #FD9F28;
  width: 100%;
  height: 30px;
  cursor: pointer;
  border-radius: 4px;
  background-color:transparent;

  &:hover {
  filter: brightness(110%);
}
  &:active {
    filter: brightness(110%);
    animation: squash .3s forwards ease-in;
    @keyframes squash {
      0% {

      }
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
}
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
`;

const StyledText = styled.span`
  color: #FD9F28;
  white-space: nowrap;
`;

const DetailPage = () => {
  const history = useHistory();
  const { zzalId } = useParams();
  const { authState: { isAuthorized, authToken, myUser }} = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `bearer ${authToken}` }), [authToken]);

  const [postingDetails, getDetails] = useAxios();
  const [comments, setComments] = useState([]);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [, setIsConfirmed] = useState();

  const handleClickConfirm = useCallback(() => {
    setIsConfirmed(true);  
    setConfirmVisible(false);
    history.push(`/editZzal/${zzalId}`);
  }, [setConfirmVisible]);

  const handleClickRemoveConfirm = async () => {
    setIsConfirmed(true);  
    setConfirmVisible(false);
    await deletePost({ 
      headers,
      data: { id: zzalId }
    });
  };

  const handleClickCancel = useCallback(() => {
    setIsConfirmed(false);  
    setConfirmVisible(false);
  }, [setConfirmVisible]);

  const [createdComment, createComment] = useAxios('/comments/create', {
    method: 'post'
  });

  const [, deletePost] = useAxios('/posts/delete', {
    method: 'delete'
  });

  const [, deleteComment] = useAxios('/comments/delete', {
    method: 'delete'
  });

  useEffect(() => {
    getDetails({ url: `/posts/${zzalId}` });
  }, []);

  useEffect(() => {
    const { value: postingInfos } = postingDetails;
    postingInfos && setComments(postingInfos.comments);
  }, [postingDetails]);
  
  useEffect(() => {
    const { value: comment } = createdComment;
    const { image: myImage, fullName: myFullName, _id: myId } = myUser;
    if (isNewComment && isAuthorized) {
      setComments([
        ...comments,
        {
          _id: comment._id,
          comment: comment.comment,
          author: { 
            _id: myId,
            fullName: myFullName,
            image: myImage
          },
          createdAt: comment.createdAt
        }
      ]);
    }

    setIsNewComment(false);
  }, [isNewComment, myUser]);

  const handleClickRemovePosting = () => {
    setConfirmVisible(true);
  };

  const handleClickSubmitComment = async comment => {
    await createComment({ 
      headers,
      data: { 
        comment,
        postId: zzalId
      }
    });

    setIsNewComment(true);
  };

  const handleClickRemoveComment = async id => {

    await deleteComment({ 
      headers,
      data: { 
        id
      }
    });

    const filteredComments = comments.filter(({ _id }) => _id !== id);

    setComments([
      ...filteredComments
    ]);
  };
  
  const handleClickCopy = () => {
    navigator.clipboard.writeText(postingDetails.value.image);
    setVisible(true);
  };

  const handleClickEditPost = () => {
    setConfirmVisible(true);
  };

  const handleShowComment = () => {
    setIsShowComments(true);
  };
  
  const { value: postingInfos } = postingDetails;
  
  return (
    <>
      { postingInfos 
        && <div 
          style={{ 
            margin: '0 auto',
            width: '40%'
          }} >
          <Posting postingInfos={postingInfos} />
          <CopyButton 
            onClick={handleClickCopy}
            width='100%'
            height='40px'
          >
            <StyledText 
              bold
            >복사</StyledText>
          </CopyButton>
          <AlertModal
            title='Copied'
            description='이미지 URL이 복사되었습니다'
            visible={visible}
            handleClose={() => setVisible(false)}
          />
          <div
            style={{ 
              margin: '10px 0' }} >
            <Text> {postingInfos.title} </Text>
          </div>
          <IconsContainer>
            <IconsWrapper>
              <Favorite
                likes={postingInfos.likes}
                postId={postingInfos._id}
              />
              <CommentIcon>
                <Icon
                  name='comment'
                ></Icon>
                <Number value={postingInfos.comments.length} />
              </CommentIcon>
            </IconsWrapper>
            <IconsWrapper inVisible={myUser._id === postingInfos.author._id}>
              <StyledIcon
                name={'edit'}
                onClick={handleClickEditPost}
              ></StyledIcon>
              <ConfirmModal
                title='Go'
                description='포스트 수정 페이지로 이동하시겠습니까?'
                visible={confirmVisible}
                handleClickConfirm={handleClickConfirm}
                handleClickCancel={handleClickCancel} 
              >
              </ConfirmModal>
              <StyledIcon
                name={'remove'}
                onClick={handleClickRemovePosting}
              ></StyledIcon>
              <ConfirmModal
                title='Remove'
                description='포스트를 삭제하시겠습니까??'
                visible={confirmVisible}
                handleClickConfirm={handleClickRemoveConfirm}
                handleClickCancel={handleClickCancel} 
              >
              </ConfirmModal>
            </IconsWrapper> 
          </IconsContainer>
          <ShowCommentButton
            onClick={handleShowComment}
            style={{ display: isShowComments ? 'none' : 'flex' }}
          >
            <Icon name='comment' />
          </ShowCommentButton>
          {isShowComments && (
            <Comment
              comments={comments}
              myUserId={myUser._id}
              myName={myUser.fullName}
              handleSubmit={handleClickSubmitComment}
              handleClickDelete={handleClickRemoveComment}
            />
          )}
        </div>
      }
    </>
  );
};

const IconsContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 0;
`;

const IconsWrapper = styled.div`
display: ${({ inVisible }) => inVisible ? 'none' : 'flex'};
gap: 5px;
`;

const ShowCommentButton = styled.div`
width: 100%;
height: 30px;
padding: 5px;
font-size: 24px;
justify-content: center;
cursor: pointer;
color: ${colors.PRIMARY_LIGHT};
background-color: ${colors.PRIMARY_BACKGROUND};
transition: .1s all ease-in;
&:hover {
  filter: brightness(98%);
  color: ${colors.ACCENT}
}
&::after {
  content:'+';
  display: inline-block;
}
`;

const CommentIcon = styled.div`
display:flex;
`;

DetailPage.propTypes = {
  params: PropTypes.string
};

export default DetailPage;
