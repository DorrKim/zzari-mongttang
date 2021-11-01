import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@base/Checkbox';

const CategoryChip = ({ name, selected, ...props }) => {

  return <Checkbox checked={selected} name={name} {...props}/>;
};

CategoryChip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node,
    PropTypes.string
  ]),
  name: PropTypes.string,
  selected: PropTypes.bool
};

export default CategoryChip;
