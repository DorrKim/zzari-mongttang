import React from 'react';
import PropTypes from 'prop-types';

import useClickAway from '@hooks/useClickAway';
import useToggle from '@hooks/useToggle';
import Avatar from '@components/Avatar';
import MenuBar from '@domains/MenuBar';


const ProfileButton = ({ myUser, ...props }) => {
  const [showMenuBar, toggleMenuBar] = useToggle(false);

  const menuBarRef = useClickAway(() => {
    if (!showMenuBar){
      return;
    }

    toggleMenuBar();
  });

  return (
    <div ref={menuBarRef} style={{ position: 'relative' }} {...props}>
      <Avatar src={myUser?.image} size={45} onClick={toggleMenuBar} />
      <MenuBar
        userId={myUser?._id} 
        style={{ display: showMenuBar ? 'flex' : 'none' }}
        onClear={() => toggleMenuBar()}
      />
    </div>
  );
};

ProfileButton.propTypes = {
  myUser: PropTypes.object
};

export default ProfileButton;
