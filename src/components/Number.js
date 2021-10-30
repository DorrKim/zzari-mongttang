import React from 'react';
import PropTypes from 'prop-types';

import Text from '@components/base/Text';

const Number = ({ favoriteCount }) => {
  return (
    <Text>{favoriteCount}</Text>      
  );
};

Number.propTypes = {
  favoriteCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default Number;
