import BoardList from './BoardList/BoardList';
import Logo from './Logo/Logo';
import NeedHelp from './NeedHelp/NeedHelp';

import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Logo />
      <BoardList />
      <NeedHelp />
    </div>
  );
};

export default Sidebar;
