import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ children, initialSelected = 0, onChange, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialSelected);

  const Categories = React.Children.toArray(children)
    .filter(element => {
      if (React.isValidElement(element)){
        return true;
      }
    })
    .map((element, index) => {
      return React.cloneElement(element, {
        ...element.props,
        selected: index === selectedIndex,
        onClick: () => {
          if (index !== selectedIndex) {
            setSelectedIndex(index);
            onChange && onChange(element.props);
          }
        }
      });
    });

  return <div {...props}>{Categories}</div>;
};

CategoryList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node
  ]),
  initialSelected: PropTypes.number,
  onChange: PropTypes.func
};

export default CategoryList;
