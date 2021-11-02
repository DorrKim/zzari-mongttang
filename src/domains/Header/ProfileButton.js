import React from 'react';
import PropTypes from 'prop-types';

import noImage from '@assets/no_img.png';
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
      <Avatar src={myUser?.image || noImage} size={45} onClick={toggleMenuBar} />
      <MenuBar userId={myUser?._id} style={{ display: showMenuBar ? 'flex' : 'none' }} />
    </div>
  );
};

ProfileButton.propTypes = {
  myUser: PropTypes.object
};

export default ProfileButton;
