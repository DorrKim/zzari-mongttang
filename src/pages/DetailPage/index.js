import React, { useEffect, useState, useCallback } from 'react';
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

const DetailPage = () => {
  const history = useHistory();
  const { zzalId } = useParams();
  const { authState } = useAuthorization();
  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);

  const [postingDetails, getDetails] = useAxios();
  const [comments, setComments] = useState([]);

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
  
  const handleClickRemovePosting = async () => {
    await deletePost({ 
      headers,
      data: { id: zzalId }
    });
  };

  const handleClickSubmitComment = useCallback(async comment => {
    const newDate = new Date();
    await createComment({ 
      headers,
      data: { 
        comment,
        postId: zzalId
      }
    });

    const { value: { comments, author }} = postingDetails;
    const initialComments = comments;
    setComments([
      ...initialComments,
      {
        _id: comments.length + newDate.toISOString(),
        comment,
        author: { _id: myUser._id,
          fullName: author.fullName },
        createdAt: newDate.toISOString()
      }
    ]);
  });

  const handleClickRemoveComment = async id => {
    await deleteComment({ 
      headers,
      data: { id: createdComment.value?._id }
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
    history.push('/editProfile');
  };
  console.log(postingDetails);
  
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
          <Icon
            name={'heart'}
          ></Icon>
          <h1>
            {postingInfos.likes.length}
          </h1>
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
      }
    </>
  );
};

DetailPage.propTypes = {
  params: PropTypes.string
};

export default DetailPage;
