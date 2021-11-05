import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import styled from '@emotion/styled';
import colors from '@constants/colors';
import { ICON_TYPES } from '@constants/icons';
import { useAuthorization } from '@context/AuthorizationProvider';
import LoginConfirmModal from '@domains/NotationModal/LoginConfirmModal';
import useQuery from '@hooks/useQuery';


const ZzalCreate = () => {
  const history = useHistory();
  const { authState } = useAuthorization();
  const { isAuthorized } = authState;
  const [isShowLoginConfirm, setIsShowLoginConfirm] = useState(false);
  const queryId = useQuery().get('channelId');
  const [channelId, setChannelId] = useState(queryId);

  useEffect(() => {
    setChannelId(queryId);
  }, [queryId]);
  
  const handleToUploadPage = useCallback(() => {
    if (!isAuthorized) {
      setIsShowLoginConfirm(true);
      
      return;
    }

    channelId ? history.push(`/upload/?channelId=${channelId}`) : history.push('/upload');
  }, [history, isAuthorized, channelId]);

  return (
    <>
      <StyledZzalBox onClick={handleToUploadPage}>
        <StyledIcon />
      </StyledZzalBox>
      <LoginConfirmModal
        visible={isShowLoginConfirm}
        handleClickConfirm={() => history.push('/login')}
        handleClickCancel={() => setIsShowLoginConfirm(false)}
      />
    </>
  );
};

const StyledZzalBox = styled.div`
  display: flex;
  width: 229px;
  height: 229px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 5px 8px 10px 10px ${colors.PRIMARY_BACKGROUND};
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    border: 4px solid ${colors.ACCENT};
    color: ${colors.ACCENT};
  }

  &:hover ICON_TYPES.plus {
    color: ${colors.ACCENT};
  }
  
  @media(max-width: 1012px) {
    width: calc((100vw - 64px) / 4);
    height: calc((100vw - 64px) / 4);
  }

  @media(max-width: 768px) {
    width: calc((100vw - 56px) / 3);
    height: calc((100vw - 56px) / 3);
  }

  @media(max-width: 590px) {
    width: calc((100vw - 12px) / 2);
    height: calc((100vw - 12px) / 2);
  } 
`;

const StyledIcon = styled(ICON_TYPES.plus)`
  font-size: 2rem;
  color: ${colors.ACCENT};
`;

export default ZzalCreate;
