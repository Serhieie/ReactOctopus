import LogoSprite from '../../../assets/sprite.svg';

import './CreateBoardButton.scss';

const CreateBoardButton = () => {
  return (
    <div className="sidebar_create-con">
      <p className="sidebar_create-title">Create a new board</p>
      <button type="button" className="sidebar_create-btn">
        <svg className="sidebar_create-ico" width="20" height="20">
          <use xlinkHref={`${LogoSprite}#icon-plus`}></use>
        </svg>
      </button>
    </div>
  );
};

export default CreateBoardButton;
