import React from 'react';
import Modal from '@base/Modal';
import PropTypes from 'prop-types';
import Tab from '@domains/Tab';
import Text from '@base/Text';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

const FollowModal = ({ visible, followers, following, followState, myUserImage, myUserName, activeIndex, onClose }) => {
  
  return (
    <Modal visible={visible} onClose={onClose} width='300px' height='400px'>
      <Tab activeIndex={activeIndex}>
        <Tab.Header>
          <Tab.Item index={0}><Text bold>팔로워</Text></Tab.Item>  
          <Tab.Item index={1}><Text bold>팔로잉</Text></Tab.Item>
        </Tab.Header>
        <Tab.Panel>
          <FollowerList 
            index={0} 
            followers={followers}
            followState={followState}
            myUserImage={myUserImage}
            myUserName={myUserName}/>
          <FollowingList 
            index={1} 
            following={following}/>
        </Tab.Panel>
      </Tab>
    </Modal>
  );
};

FollowModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array, 
  followState: PropTypes.bool,
  myUserImage: PropTypes.string, 
  myUserName: PropTypes.string,
  activeIndex: PropTypes.number,
  onClose: PropTypes.func
};

export default FollowModal;
