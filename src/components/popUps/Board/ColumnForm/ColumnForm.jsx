import css from './ColumnForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import IconsList from '../Icons/IconsList';
import BackgroundsInputList from '../BackgroundsInputList/BackgroundsInputList';
import InputForm from '../InputForm/InputForm';
const INITIAL_STATE = {
  title: '',
  icon: '',
  background: '',
};
const icons = [
  'project',
  'star',
  'loading',
  'puzzle-piece',
  'container',
  'lightning',
  'colors',
  'hexagon-modal',
];

const backgroundsImages = [
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/azx7z046l7otrrbybf8t.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/dt0pnm7qqba1jbuaggos.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575496/react-octopus/desctop/fekrlygw3hcac9ru0sqj.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/lpu2pjs0unoybmvruwge.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/oioqcxagtto7ilqncz7d.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/pcd3w8ppgzi2lmauedy0.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575496/react-octopus/desctop/pepbaej240byrklobpps.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/pocp8odhoyjois3cgklq.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/skjreeivvnhgbeqtimkt.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/sonbth2fgcewwdkvdo1t.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/u6oz79jyn0bxqo1au95j.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/w8rzb44uxyw6yuvbrqsy.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/wp3hgdz2snmgvtezu8oi.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575495/react-octopus/desctop/yl2osbr3sirp6noadvrx.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575494/react-octopus/desctop/zozmb4dmjfzeygotfzpg.webp',
];

const ColumnForm = ({ data }) => {
  const [columns, setColumns] = useState({
    ...data,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setColumns({
      ...columns,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Saved');
      // const response = await axios.post('/api/columns', columns);
      reset();
    } catch (error) {
      console.error('Error saving form data:', error);
    }
    reset();
  };

  const reset = () => {
    setColumns({ ...INITIAL_STATE });
  };

  const { title, icon, background } = columns;

  return (
    <form onSubmit={handleSubmit}>
      <InputForm onChange={handleChange} value={title} />
      <div className={css.iconsInputWrapper}>
        <h3 className={css.formSubtitle}>Icons</h3>
        <IconsList onChange={handleChange} items={icons} checked={icon} />
      </div>
      <div className={css.backgroundsInputWrapper}>
        <h3 className={css.formSubtitle}>Background</h3>
        <BackgroundsInputList
          onChange={handleChange}
          items={backgroundsImages}
          checked={background}
        />
      </div>
      <button className={css.submitNewColumnBtn} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ColumnForm;
