import css from './BackgroundsInputList.module.scss';
import { nanoid } from '@reduxjs/toolkit';

const BackgroundsInputList = ({ onChange, items, checked }) => {
  const backgroundId = nanoid();

  const elements = items.map((item, index) => {
    const backgroundId = nanoid();

    return (
      <li className={css.backgroundsItem} key={index}>
        <label htmlFor={backgroundId} className={css.label}>
          <input
            onChange={onChange}
            className={css.radioIcon}
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

  return <ul className={css.backgoundsList}>{elements}</ul>;
};

export default BackgroundsInputList;
