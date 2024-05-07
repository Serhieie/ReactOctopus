import css from './BackgroundsInputList.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import clsx from 'clsx';

import defaultBackgroundDark from '../../../../assets/themeDefault/backgroundDark.png';
import defaultBackgroundLight from '../../../../assets/themeDefault/backgroundLight.png';
import defaultBackgroundViolet from '../../../../assets/themeDefault/backgroundViolet.png';

const BackgroundsInputList = ({ onChange, items, checked = undefined }) => {
  const backgroundId = nanoid();

  const theme = 'Violet';

  const getDefaultBackground = (theme) => {
    switch (theme) {
      case 'Dark':
        return defaultBackgroundDark;
      case 'Light':
        return defaultBackgroundLight;
      case 'Violet':
      default:
        return defaultBackgroundViolet;
    }
  };

  const elements = items.map((item, index) => {
    const backgroundId = nanoid();

    return (
      <li className={css.backgroundsItem} key={index}>
        <label htmlFor={backgroundId} className={css.label}>
          <input
            onChange={onChange}
            className={clsx(css.backgroundsIcon, {
              [css.backgroundsIconDark]: theme === 'Dark',
              [css.backgroundsIconLight]: theme === 'Light',
              [css.backgroundsIconViolet]: theme === 'Violet',
            })}
            type="radio"
            name="background"
            id={backgroundId}
            value={item}
            checked={checked === item}
          />
          <img
            width="28"
            height="28"
            className={css.backgroundItemImg}
            src={item}
            alt={item}
          />
        </label>
      </li>
    );
  });

  return (
    <ul className={css.backgoundsList}>
      <li className={css.backgroundsItem}>
        <label htmlFor={backgroundId} className={css.label}>
          <input
            onChange={onChange}
            className={clsx(css.backgroundsIcon, {
              [css.backgroundsIconDark]: theme === 'Dark',
              [css.backgroundsIconLight]: theme === 'Light',
              [css.backgroundsIconViolet]: theme === 'Violet',
            })}
            type="radio"
            name="background"
            id={backgroundId}
            value={getDefaultBackground(theme)}
            checked={checked === getDefaultBackground(theme)}
          />
          <img
            width="28"
            height="28"
            className={css.backgroundItemImg}
            src={getDefaultBackground(theme)}
            alt="Background image"
          />
        </label>
      </li>
      {elements}
    </ul>
  );
};

export default BackgroundsInputList;
