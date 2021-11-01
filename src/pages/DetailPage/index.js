import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useMemo } from 'react';
import { useHistory } from 'react-router';

import Button from '@components/base/Button';
import Icon from '@components/base/Icon';
import Image from '@base/Image';
import Text from '@base/Text';
import { useAuthorization } from '@context/AuthorizationProvider';
import Flex from '@base/Flex';
import Comment from '@domains/Comment';
import Favorite from '@components/Favorite';
import styled from '@emotion/styled';
import colors from '@constants/colors';

const DetailPage = () => {
  const history = useHistory();
  const { zzalId } = useParams();
  const { authState: { isAuthorized, authToken, myUser }} = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `bearer ${authToken}` }), [authToken]);

  const [postingDetails, getDetails] = useAxios();
  const [comments, setComments] = useState([]);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

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

  const handleClickRemovePosting = async () => {
    await deletePost({ 
      headers,
      data: { id: zzalId }
    });
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
  };
  
  const handleClickBack = () => {
    history.goBack();
  };

  const handleClickEditPost = () => {
    history.push(`/editZzal/${zzalId}`);
  };

  const handleShowComment = () => {
    setIsShowComments(true);
  };
  
  const { value: postingInfos } = postingDetails;
  
  return (
    <>
      {
        postingInfos
      && <div style={{ 
        margin: '0 auto',
        width: '40%'
      }}>
        <Flex>
          <div
            style={{ 
              width: '10%'
            }}
          >
            <Icon 
              name={'arrowBack'}
              onClick={handleClickBack}
            >
            </Icon>
          </div>
          <div
            style={{ 
              width: '90%'
            }}
          >
            <Text>{postingInfos.title}</Text>
          </div>
        </Flex>
        <div
          style={{ 
            width: '100%'
          }}
        >
          <Image 
            src={postingInfos.image 
              ? postingInfos.image 
              : ''}
            width='100%'
            height='content-fit'
          >
          </Image>
          <Button 
            onClick={handleClickCopy}
            width='100%'
            height='40px'
          >
            <Text 
              bold
            >복사</Text>
          </Button>
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
                <Icon
                  name={'edit'}
                  onClick={handleClickEditPost}
                ></Icon>
                <Icon
                  name={'remove'}
                  onClick={handleClickRemovePosting}
                ></Icon>
              </div>
              : <div></div>
          }
          
        </Flex>
        <ShowCommentButton
          name={'arrowDown'}
          onClick={handleShowComment}
          style={{ display: isShowComments ? 'none' : 'block' }}
        >
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

const ShowCommentButton = styled(Icon)`
width: 100%;
padding: 5px;
box-sizing: content-box;
font-size: 24px;
cursor: pointer;
color: ${colors.PRIMARY_LIGHT};
background-color: ${colors.PRIMARY_BACKGROUND};
transition: .1s all ease-in;
&:hover {
  filter: brightness(98%);
  color: ${colors.ACCENT}
}
`;

DetailPage.propTypes = {
  params: PropTypes.string
};

export default DetailPage;
