import React from 'react';
import NeedHelp from './NeedHelp/NeedHelp';
import LogoutButton from './LogoutButton/LogoutButton';

const Sidebar = () => {
  return (
    <div>
      Sidebar
      <NeedHelp />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
