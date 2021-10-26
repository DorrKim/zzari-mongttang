import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import colors from '@constants/colors';

const MenuBarContainerStyled = styled(Flex)`
  height: 156px;
  width: 117px;
  border-radius: 4px;
  padding: 6px;
  row-gap: 6px;
  background-color: white;
  box-shadow: 0 1px 2px -1px ${colors.PRIMARY};
  position:absolute;
  top: auto;
  left: -60px;
  z-index: 500;
  animation: show 0.3s forwards;

  @keyframes show {
    from {
      opacity: 0;
      transform: scaleY(0) translateY(-50%);
    }
    to {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }
`;

const MenuBarContainer = ({ children, ...props }) => {

  const MenuItems = React.Children.toArray(children)
    .filter(element => {
      if (React.isValidElement(element)) {
        return true;
      }

      return false;
    });

  return (
    <div>
      <MenuBarContainerStyled column {...props}>
        {MenuItems}
      </MenuBarContainerStyled>
    </div>);
};

MenuBarContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
};

export default MenuBarContainer;
