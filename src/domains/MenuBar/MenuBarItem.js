import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Button from '@/components/base/Button';
import Text from '@base/Text';
import colors from '@/utils/constants/colors';

const ButtonStyled = styled(Button)`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  width: 100%;

  &:hover {
    color: ${colors.PRIMARY_LIGHT};
  }
`;

const MenuBarItem = ({ children, onClick, ...props }) => {
  return <ButtonStyled onClick={onClick} {...props}>
    <Text bold>
      {children}
    </Text>
  </ButtonStyled>;
};

MenuBarItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string
  ]),
  onClick: PropTypes.func
};

export default MenuBarItem;
