import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from '@components/Avatar';
import Text from '@base/Text';
import colors from '@constants/colors';
import { useAuthorization } from '@context/AuthorizationProvider';
import { useHistory } from 'react-router';
import LoginConfirmModal from '@domains/NotationModal/LoginConfirmModal';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.PRIMARY_BACKGROUND};
`;

const Inner = styled.div`
  flex: 1 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
`;

const StyledTextarea = styled.textarea`
  width: 90%;
  /* height: 20px; */
  margin-top: 8px;
  padding: 8px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  resize: none;
  border-radius: 4px; 
  border-color: ${colors.PRIMARY_BACKGROUND};
  
  &:is(:focus, :valid) {
    border-color: ${colors.ACCENT};
    outline: 1px solid ${colors.ACCENT}
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const StyledInput = styled.input`
  border: 0;
  padding: 0;
  color: #CCCCCC;
  width: 80%;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 700;
  color: ${colors.PRIMARY_BACKGROUND};
  outline: 2px solid #CCCCCC;

  &::placeholder {
    opacity: 1;
  }
`;

const CommentForm = ({ handleSubmit }) => {
  const history = useHistory();
  const { authState: { isAuthorized, myUser: { image, fullName }}} = useAuthorization();
  
  const [isLoginModalShow, setIsLoginModalShow] = useState(false);

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
      <Avatar fullName={fullName} src={image} size='64px' style={{ margin: '8px 8px 8px 12px' }}/>
      {isAuthorized
        ? (<Inner>
          <Text bold>{fullName}</Text>  
          <StyledTextarea placeholder="댓글을 입력해주세요." onKeyUp={handleKeyUp} required>
          </StyledTextarea>
        </Inner>)
        : <>
          <StyledInput type='text' placeholder='로그인하고 댓글 작성하기' onFocus={() => setIsLoginModalShow(true)}/>
          <LoginConfirmModal
            visible={isLoginModalShow}
            handleClickConfirm={() => history.push('/login')}
            handleClickCancel={() => setIsLoginModalShow(false)} />
        </>
      }
    </FormWrapper>
  );  
};

CommentForm.propTypes = {
  myProfileImage: PropTypes.string,
  myName: PropTypes.string,
  handleSubmit: PropTypes.func
};

export default CommentForm;
