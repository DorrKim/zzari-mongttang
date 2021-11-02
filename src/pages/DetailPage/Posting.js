import React from 'react';
import PropTypes from 'prop-types';

import Image from '@base/Image';
import Text from '@base/Text';

import Avatar from '@components/Avatar';

const Posting = ({ postingInfos }) => {
  return (
    <div
      style={{ position: 'relative',
        marginTop: '20px' }}
    >
      <div
        style={{ position: 'absolute', 
          left: '-60px',
          top: '0px'
        }}
      >
        <Avatar
          src={postingInfos.author.image} 
          size='48px' 
        />
      </div>
      <div
        style={{ 
          margin: '10px 0' }}
      >
        <Text
          style={{ fontWeight: 'bold' }}
        >{postingInfos.author.fullName}</Text>
      </div>
      <div
        style={{ 
          width: '100%'
        }}
      >
        <Image 
          src={postingInfos.image 
            ? postingInfos.image 
            : ''}
          width='100%'
          height='content-fit'
        >
        </Image>
        <div
        >
        </div>
      </div>
    </div>
  );
};

Posting.propTypes = {
  postingInfos: PropTypes.object
};

export default Posting;
