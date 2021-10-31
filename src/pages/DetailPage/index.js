import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import styled from '@emotion/styled';

import Button from '@components/base/Button';
import Icon from '@components/base/Icon';
import Image from '@base/Image';
import Text from '@base/Text';
import Number from '@components/Number';
import { useAuthorization } from '@context/AuthorizationProvider';
import Avatar from '@components/Avatar';
import useAxios from '@hooks/useAxios';
import { useMemo } from 'react';

const Icons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailPage = () => {
  const { zzalId } = useParams();

  const { authState } = useAuthorization();

  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);
  const [details, getDetails] = useAxios();
  const [deletePost] = useAxios('/posts/delete', {
    method: 'delete'
  });

  const [deletedComment, deleteComment] = useAxios('/comments/delete', {
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
    console.log(deletedComment);
  };
  
  return (
    <>
      <h1>짤 아이디 {zzalId}</h1>
      <Text>{details?.title}</Text>
      <Image src={details.value?.image ? details?.value?.image : ''}></Image>
      <Button>복사</Button>
      <Icons>
        <Icon
          name={'heart'}
        ></Icon>
        <Number 
          number={details?.value?.likes?.length}
        ></Number>
        <Icon
          name={'comment'}
        ></Icon>
        <Number 
          number={details?.value?.comments?.length}
        ></Number>
        {
          myUser?._id === details?.value?.author?._id
            ? <>
              <Icon
                name={'edit'}
              ></Icon>
              <Icon
                name={'remove'}
                onClick={handleClickRemovePosting}
              ></Icon>
            </>
            : <div></div>
        }
        <Icon
          name={'arrowDown'}
        ></Icon>
      </Icons>
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
    </>
  );
};

DetailPage.propTypes = {
  params: PropTypes.string

};

export default DetailPage;
