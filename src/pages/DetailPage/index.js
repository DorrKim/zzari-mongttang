import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useMemo } from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';

import Icon from '@components/base/Icon';
import { useAuthorization } from '@context/AuthorizationProvider';
import Flex from '@base/Flex';
import Comment from '@domains/Comment';
import Favorite from '@components/Favorite';
import AlertModal from '@domains/NotationModal/AlertModal';
import ConfirmModal from '@domains/NotationModal/ConfirmModal';
import Text from '@base/Text';
import Posting from './Posting';

const StyledButton = styled.button`
  border: 1px solid #FD9F28;
  width: 100%;
  height: 30px;
  cursor: pointer;
  border-radius: 4px;
  background-color:transparent;
`;

const SytledIcon = styled(Icon)`
  cursor: pointer;
`;

const StyledText = styled.span`
  color: #FD9F28;
  white-space: nowrap;
`;

const DetailPage = () => {
  const history = useHistory();
  const { zzalId } = useParams();
  const { authState } = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);

  const [postingDetails, getDetails] = useAxios();
  const [comments, setComments] = useState([]);
  const [isNewComment, setIsNewComment] = useState(false);
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

  const { myUser } = authState;

  useEffect(() => {
    getDetails({ url: `/posts/${zzalId}` });
  }, []);

  useEffect(() => {
    const { value: postingInfos } = postingDetails;
    postingInfos && setComments(postingInfos.comments);
  }, [postingDetails]);
  
  useEffect(() => {
    const { value: comment } = createdComment;
    if (isNewComment) {
      setComments([
        ...comments,
        {
          _id: comment._id,
          comment: comment.comment,
          author: { 
            _id: myUser._id,
            fullName: comment.fullName 
          },
          createdAt: comment.createdAt
        }
      ]);
    }

    setIsNewComment(false);
  }, [isNewComment]);

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
  
  const { value: postingInfos } = postingDetails;
  
  return (
    <>
      {
        postingInfos
      && <>
   
        <div 
          style={{ 
            margin: '0 auto',
            width: '40%'
          }}
        >
          { postingInfos 
          && <Posting 
            postingInfos={postingInfos}
          />}
          <StyledButton 
            onClick={handleClickCopy}
            width='100%'
            height='40px'
          >
            <StyledText 
              bold
            >복사</StyledText>
          </StyledButton>
          <AlertModal
            title='Copied'
            description='이미지 URL이 복사되었습니다'
            visible={visible}
            handleClose={() => setVisible(false)}
          />
          <div
            style={{ 
              margin: '10px 0' }}
          >
            <Text

            >{postingInfos.title}</Text>
          </div>
          <Flex>
            <Favorite
              likes={postingInfos.likes}
              postId={postingInfos._id}
            />
            <Icon
              name={'comment'}
            ></Icon>
            <h1>
              {postingInfos.comments.length}
            </h1>
            {
              myUser._id === postingInfos.author._id
                ? <div style={{ marginLeft: 'auto' }}>
                  <SytledIcon
                    name={'edit'}
                    onClick={handleClickEditPost}
                  ></SytledIcon>
                  <ConfirmModal
                    title='Go'
                    description='포스트 수정 페이지로 이동하시겠습니까?'
                    visible={confirmVisible}
                    handleClickConfirm={handleClickConfirm}
                    handleClickCancel={handleClickCancel} 
                  >
                  </ConfirmModal>
                  <SytledIcon
                    name={'remove'}
                    onClick={handleClickRemovePosting}
                  ></SytledIcon>
                  <ConfirmModal
                    title='Remove'
                    description='포스트를 삭제하시겠습니까??'
                    visible={confirmVisible}
                    handleClickConfirm={handleClickRemoveConfirm}
                    handleClickCancel={handleClickCancel} 
                  >
                  </ConfirmModal>
                </div>
                : <div></div>
            }
          
          </Flex>
          <span style={{ display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center' }}>
            <Icon
              name={'arrowDown'}
            ></Icon>
          </span>
          <Comment
            comments={comments}
            myUserId={myUser._id}
            myName={myUser.fullName}
            handleSubmit={handleClickSubmitComment}
            handleClickDelete={handleClickRemoveComment}
          />
        </div>
      </>
      }
    </>
  );
};

DetailPage.propTypes = {
  params: PropTypes.string
};

export default DetailPage;
