import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from '@components/Avatar';
import Text from '@base/Text';
import colors from '@constants/colors';


const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #E6F3E6;
`;

const Inner = styled.div`
  flex: 1 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  width: 90%;
  height: 20px;
  margin-top: 8px;
  padding: 8px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  resize: none;
  outline: none;
  border-radius: 4px; 
  border-color: ${colors.BORDER_SUBTLE};
  
  &:is(:focus, :valid) {
    border-color: ${colors.ACCENT};
    outline: 2px solid ${colors.ACCENT}
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const CommentForm = ({ myProfileImage, myName, handleSubmit }) => {
  
  const handleKeyUp = useCallback(({ target, key }) => {
    
    if (key !== 'Enter') return;
    if (target.value.trim() === '') {
      target.value = '';
      
      return;
    }

    handleSubmit && handleSubmit(target.value.trim());
    target.value = '';
  }, [handleSubmit]); 

  return (
    <FormWrapper>
      <Avatar src={myProfileImage} size='64px' style={{ margin: '8px 8px 8px 12px' }}/>
      <Inner>
        <Text bold>{myName}</Text>  
        <StyledTextarea placeholder="댓글을 입력해주세요." onKeyUp={handleKeyUp} required>
        </StyledTextarea>
      </Inner>
    </FormWrapper>
  );  
};

CommentForm.propTypes = {
  myProfileImage: PropTypes.string,
  myName: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default CommentForm;
