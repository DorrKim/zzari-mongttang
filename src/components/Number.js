import React from 'react';
import PropTypes from 'prop-types';

import Text from '@components/base/Text';

const Number = ({ value = 0 }) => {
  let formattedNumber = value;
  
  if (formattedNumber >= 10) {
    formattedNumber = (formattedNumber % 1) > 10
      ? `${(formattedNumber / 10).toFixed(1)}천`
      : `${(formattedNumber / 10)}천`;
  }
  
  return (
    <Text>{formattedNumber}</Text>      
  );
};

Number.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Number;
