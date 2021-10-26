import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import colors from '@/utils/constants/colors';
import styled from '@emotion/styled';

const MenuBarContainerStyled = styled(Flex)`
  height: 156px;
  width: 117px;
  border-radius: 4px;
  padding: 6px;
  row-gap: 6px;
  background-color: white;
  box-shadow: 0 1px 2px -1px ${colors.PRIMARY};
`;

const MenuBarContainer = ({ children, ...props }) => {
  const MenuItems = React.Children.toArray(children)
    .filter(element => {
      if (React.isValidElement(element)) {
        return true;
      }

      return false;
    });

  return <MenuBarContainerStyled column {...props}>
    {MenuItems}
  </MenuBarContainerStyled>;
};

MenuBarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

export default MenuBarContainer;
