import css from './IconsList.module.scss';

import Icons from '../../../../assets/sprite.svg';
import { nanoid } from '@reduxjs/toolkit';

const IconsList = ({ onChange, items, checked }) => {
  const elements = items.map((icon, index) => {
    const iconId = nanoid();
    return (
      <li className={css.iconsItem} key={index}>
        <label htmlFor={iconId} className={css.label}>
          <input
            onChange={onChange}
            className={css.radioIcon}
            type="radio"
            name="icon"
            id={iconId}
            value={icon}
            checked={checked === icon}
          />
          <svg width="18" height="18">
            <use className={css.icon} xlinkHref={`${Icons}#icon-${icon}`} />
          </svg>
        </label>
      </li>
    );
  });

  return <ul className={css.iconsList}>{elements}</ul>;
};

export default IconsList;
