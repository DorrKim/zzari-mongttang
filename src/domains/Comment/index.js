import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

const Comment = ({ comments }) => {
  console.log(comments);
  
  return (
    <div>
      {comments.map(comment => <CommentItem key={comment._id} comment={comment}/>)}
    </div>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comment;
