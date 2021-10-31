import React from 'react';
import PropTypes from 'prop-types';

import Text from '@components/base/Text';

const Number = ({ value }) => {
  return (
    <Text>{value}</Text>      
  );
};

Number.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Number;
