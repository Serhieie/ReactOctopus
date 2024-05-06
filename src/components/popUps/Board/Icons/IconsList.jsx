import css from './IconsList.module.scss';
import clsx from 'clsx';
import { nanoid } from '@reduxjs/toolkit';

import Icons from '../../../../assets/sprite.svg';

const IconsList = ({ onChange, items, checked }) => {
  const theme = 'Violet';

  const elements = items.map((icon, index) => {
    const iconId = nanoid();
    return (
      <li className={css.iconsItem} key={index}>
        <label htmlFor={iconId} className={css.label}>
          <input
            onChange={onChange}
            className={clsx(css.radioIcon, {
              [css.radioIconDark]: theme === 'Dark',
              [css.radioIconLight]: theme === 'Light',
              [css.radioIconViolet]: theme === 'Violet',
            })}
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
