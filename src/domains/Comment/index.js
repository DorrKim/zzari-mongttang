import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';
import Flex from '@base/Flex';
import CommentForm from './CommentForm';

const CommentList = styled.li`
  list-style: none;
  background-color: #FfFBF6;
`;

const Comment = ({ comments, myUserId = '61795b2aa1f9673a2292a0d8', myName, handleSubmit, handleClickDelete }) => {
  return (
    <Flex column>
      <CommentForm handleSubmit={handleSubmit} myName={myName}>

      </CommentForm>
      <CommentList>
        {comments.map(({ _id, comment, author, createdAt }) => (
          <CommentItem 
            key={_id} 
            id={_id}
            isMyComment={myUserId === author._id} 
            comment={comment}
            author={author}
            createdAt={createdAt}
            handleClickDelete={handleClickDelete}
          />
        ))}
      </CommentList>
    </Flex>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  myUserId: PropTypes.string,
  myName: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleClickDelete: PropTypes.func
};

export default Comment;
