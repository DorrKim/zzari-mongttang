import React from 'react';
import PropTypes from 'prop-types';

const FollowerList = ({ followers, followState, myUserImage, myUserName }) => {
  console.log(followers);
  console.log(followState);
  console.log(myUserImage);
  console.log(myUserName);
  
  return (
    <ul>
      <li>
        <div>
        </div>
      </li>
    </ul>
  );
};

FollowerList.propTypes = {
  followers: PropTypes.array, 
  followState: PropTypes.bool,
  myUserImage: PropTypes.string, 
  myUserName: PropTypes.string
};

export default FollowerList;
