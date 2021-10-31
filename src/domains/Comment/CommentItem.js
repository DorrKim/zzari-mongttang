import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styled from '@emotion/styled';
import Text from '@base/Text';

const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 328px;
  height: 80px;
  margin-top: 16px;
  background-color: #FBF7F2;
  border-radius: .5rem;
`;

const CommentInfo = styled.div`
  height: 100%;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CommentItem = ({ comment }) => {
    
  return (
    <CommentItemWrapper>
      <Avatar src={comment.author.image} size='64px' style={{ margin: '8px 8px 8px 12px' }}/>
      <CommentInfo>
        <Text bold>{comment.author.fullName}</Text>
        <Text style={{ marginTop: '8px' }}>{comment.comment}</Text>
      </CommentInfo>
    </CommentItemWrapper>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object
};

export default CommentItem;
