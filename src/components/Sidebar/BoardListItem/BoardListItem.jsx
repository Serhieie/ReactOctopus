import LogoSprite from '../../../assets/sprite.svg';

import './BoardListItem.scss';

const BoardListItem = () => {
  return (
    <li className="sidebar_board-item">
      <div className="sidebar_boart-cont">
        <svg className="sidebar_board-item-ico" width="18" height="18">
          <use xlinkHref={`${LogoSprite}#icon-Project`}></use>
        </svg>
        <p className="sidebar_board-title">BoardListItem</p>
      </div>
      <div className="sidebar_boart-cont">
        <button type="button" className="sidebar_board-edit-btn">
          <svg className="sidebar_board-edit-ico" width="16" height="16">
            <use xlinkHref={`${LogoSprite}#icon-pencil`}></use>
          </svg>
        </button>
        <button type="button" className="sidebar_board-remove-btn">
          <svg className="sidebar_board-remove-ico" width="16" height="16">
            <use xlinkHref={`${LogoSprite}#icon-trash`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default BoardListItem;
