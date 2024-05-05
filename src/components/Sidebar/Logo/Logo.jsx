import LogoSprite from '../../../assets/sprite.svg';

import './Logo.scss';

const Logo = () => {
  return (
    <div className="sidebar_logo">
      <div className="logo-ico_con">
        <svg className="logo-ico" width="12" height="16">
          <use xlinkHref={`${LogoSprite}#icon-lightning`}></use>
        </svg>
      </div>
      <div>
        <p>Task Pro</p>
      </div>
    </div>
  );
};

export default Logo;
