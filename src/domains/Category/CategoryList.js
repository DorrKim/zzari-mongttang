import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ children, selectedIndex = 0, onChange, ...props }) => {
  const [currentIdx, setCurrentIdx] = useState(selectedIndex);

  useEffect(() => {
    setCurrentIdx(selectedIndex);
  }, [selectedIndex]);

  const Categories = React.Children.toArray(children)
    .filter(element => {
      if (React.isValidElement(element)){
        return true;
      }
    })
    .map((element, index) => {
      return React.cloneElement(element, {
        ...element.props,
        selected: index === currentIdx,
        onClick: () => {
          if (index !== currentIdx) {
            setCurrentIdx(index);
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
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func
};

export default CategoryList;
