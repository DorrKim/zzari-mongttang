import React from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import styled from '@emotion/styled';


const ZzalItem = ({
  imageUrl = '',
  ...props
}) => {
  return (
    <StyledItem style={{ alignContent: 'center' }}>
      <Image src={imageUrl} {...props}></Image>
    </StyledItem>
  );
};

const StyledItem = styled.div`
  width: 152px;
  height: 152px;
  padding: 8px;
  overflow: hidden;
  align-content: center;
`;

ZzalItem.propTypes = {
  imageUrl: PropTypes.string
};


export default ZzalItem;
