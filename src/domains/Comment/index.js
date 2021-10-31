import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';

const CommentList = styled.li`
  list-style: none;
  background-color: #FfFBF6;
`;

const Comment = ({ comments, myUserId = '61795b2aa1f9673a2292a0d8' }) => {
  return (
    <>
      <CommentList>
        {comments.map(({ _id, comment, author, createdAt }) => (
          <CommentItem 
            key={_id} 
            id={_id}
            isMyComment={myUserId === author._id} 
            comment={comment}
            author={author}
            createdAt={createdAt}
          />
        ))}
      </CommentList>
    </>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  myUserId: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleClickDelete: PropTypes.func
};

export default Comment;
