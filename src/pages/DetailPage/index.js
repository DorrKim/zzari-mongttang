import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useMemo } from 'react';

import Button from '@components/base/Button';
import Icon from '@components/base/Icon';
import Image from '@base/Image';
import Text from '@base/Text';
import { useAuthorization } from '@context/AuthorizationProvider';
import Avatar from '@components/Avatar';
import Flex from '@base/Flex';

const DetailPage = () => {
  const { zzalId } = useParams();

  const { authState } = useAuthorization();

  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);
  const [details, getDetails] = useAxios();
  const [deletePost] = useAxios('/posts/delete', {
    method: 'delete'
  });

  const [deleteComment] = useAxios('/comments/delete', {
    method: 'delete'
  });

  const [postComment] = useAxios('/comments/create', {
    method: 'post'
  });

  const { myUser } = authState;

  useEffect(() => {
    getDetails({ url: `/posts/${zzalId}` });
  }, []);
  
  const handleClickRemovePosting = async () => {
    await deletePost({ 
      headers,
      data: { id: zzalId }
    });
  };

  const handleClickSubmitComment = async () => {
    await postComment({ 
      headers,
      data: { 
        comment: '댓글 내용',
        postId: zzalId
      }
    });
  };

  const handleClickRemoveComment = async () => {
    await deleteComment({ 
      headers,
      data: { id: '아이디' }
    });
  };
  
  const handleClickCopy = () => {
    navigator.clipboard.writeText(details.value?.image);
  };
  
  return (
    <div style={{ 
      margin: '0 auto',
      width: '40%'
    }}>
      <Flex
        style={{}}
      >
        <div
          style={{ 
            width: '10%'
          }}
        >
          <Icon 
            name={'arrowBack'}
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
      <div>
        <Avatar></Avatar>
        <Text>승희</Text>
        <Button
          onClick={handleClickSubmitComment}
        >제출</Button>
      </div>
      {
        details?.value?.comments 
          ? details?.value?.comments.map(commentInfo => <div key={commentInfo?._id}>
            <Avatar></Avatar>
            <Text>{commentInfo?.author?.fullName}</Text>
            <Text>{commentInfo?.createdAt}</Text>
            <Text>{commentInfo?.comment}</Text>
            {
              myUser?._id === commentInfo?.author?._id 
                ? <>
                  <Icon
                    name={'edit'}
                  ></Icon>
                  <Icon
                    name={'remove'}
                    onClick={handleClickRemoveComment}
                  ></Icon>
                </>
                : <></>
            } 
          </div>
          ) : <div></div>
      }
    </div>
  );
};

DetailPage.propTypes = {
  params: PropTypes.string

};

export default DetailPage;
