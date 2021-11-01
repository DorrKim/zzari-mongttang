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
  const [comments, setComments] = useState([]);

  const history = useHistory();

  const { zzalId } = useParams();

  const { authState } = useAuthorization();

  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);
  const [details, getDetails] = useAxios();
  const [, deletePost] = useAxios('/posts/delete', {
    method: 'delete'
  });

  const [, deleteComment] = useAxios('/comments/delete', {
    method: 'delete'
  });

  const [createdComment, createComment] = useAxios('/comments/create', {
    method: 'post'
  });

  const { myUser } = authState;

  useEffect(() => {
    getDetails({ url: `/posts/${zzalId}` });
  }, []);

  useEffect(() => {
    details.value && setComments(details.value.comments);
  }, [details]);
  
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

    setComments([
      ...details?.value?.comments,
      {
        _id: comments.length + newDate.toISOString(),
        comment,
        author: { _id: myUser?._id,
          fullName: details?.value?.author?.fullName },
        createdAt: newDate.toISOString()
      }
    ]);
  });

  const handleClickRemoveComment = async id => {
    await deleteComment({ 
      headers,
      data: { id: createdComment.value._id }
    });

    const filteredComments = comments.filter(({ _id }) => _id !== id);

    setComments([
      ...filteredComments
    ]);
  };
  
  const handleClickCopy = () => {
    navigator.clipboard.writeText(details.value?.image);
  };
  
  const handleClickBack = () => {
    history.goBack();
  };

  const handleClickEditPost = () => {
    history.push('/editProfile');
  };
  
  return (
    <div style={{ 
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
          <Text>{details?.value?.title}</Text>
        </div>
      </Flex>
      <div
        style={{ 
          width: '100%'
        }}
      >
        <Image 
          src={details.value?.image 
            ? details?.value?.image 
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
          {details?.value?.likes?.length}
        </h1>
        <Icon
          name={'comment'}
        ></Icon>
        <h1>
          {details?.value?.comments?.length}
        </h1>
        {
          myUser?._id === details?.value?.author?._id
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

      {details?.value?.comments
        && <Comment
          comments={comments}
          myUserId={myUser?._id}
          myName={myUser?.fullName}
          handleSubmit={handleClickSubmitComment}
          handleClickDelete={handleClickRemoveComment}
        />
      }
    </div>
  );
};

DetailPage.propTypes = {
  params: PropTypes.string
};

export default DetailPage;
