import css from './ColumnForm.module.scss';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import IconsList from '../Icons/IconsList';
import BackgroundsInputList from '../BackgroundsInputList/BackgroundsInputList';
import InputForm from '../InputForm/InputForm';
import ModalButton from '../../ModalButton/ModalButton';
import { useDispatch } from 'react-redux';
import { addBoard, editeBoard } from '../../../../redux/api/tasks-api';
import { useAuth } from '../../../../hooks';

const INITIAL_STATE = {
  title: '',
  iconId: 'project',
  background: '/ReactOctopus/src/assets/themeDefault/backgroundViolet.png',
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

const ColumnForm = ({
  action = 'Create',
  data = INITIAL_STATE,
  item = null,
}) => {
  const dispatch = useDispatch();
  const { theme } = useAuth();
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

    if (columns.title === '') {
      toast.error('Title is required');
    } else {
      try {
        if (action === 'Create') {
          dispatch(addBoard({ ...columns }));

          // const response = await axios.post('/api/columns', columns);
          console.log('Saved');
        } else {
          if (item)
            dispatch(
              editeBoard(item._id, {
                title: columns.title,
                iconId: columns.iconId,
                background: columns.background,
              })
            );

          //const response = await axios.put(`/api/columns/${columns.id}`, columns);
          console.log('Updated');
        }
        reset();
      } catch (error) {
        console.error('Error saving form data:', error);
      }
      reset();
    }
  };

  const reset = () => {
    setColumns({ ...INITIAL_STATE });
  };

  const stylesDark = css.formSubtitleDark;
  const stylesLight = css.formSubtitleLight;
  const stylesViolet = css.formSubtitleViolet;

  const { title, icon, background } = columns;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputForm onChange={handleChange} value={title} />
        <div className={css.iconsInputWrapper}>
          <h3
            className={clsx(css.formSubtitle, {
              [stylesDark]: theme === 'dark',
              [stylesLight]: theme === 'light',
              [stylesViolet]: theme === 'violet',
            })}
          >
            Icons
          </h3>
          <IconsList onChange={handleChange} items={icons} checked={icon} />
        </div>
        <div className={css.backgroundsInputWrapper}>
          <h3
            className={clsx(css.formSubtitle, {
              [stylesDark]: theme === 'dark',
              [stylesLight]: theme === 'light',
              [stylesViolet]: theme === 'violet',
            })}
          >
            Background
          </h3>
          <BackgroundsInputList
            onChange={handleChange}
            items={backgroundsImages}
            checked={background}
          />
        </div>
        <ModalButton type="submit" text="Create" />
      </form>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ColumnForm;
