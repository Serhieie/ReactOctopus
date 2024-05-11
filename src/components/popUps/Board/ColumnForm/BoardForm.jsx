import css from './BoardForm.module.scss';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import IconsList from '../Icons/IconsList';
import BackgroundsInputList from '../BackgroundsInputList/BackgroundsInputList';
import InputForm from '../InputForm/InputForm';
import ModalButton from '../../ModalButton/ModalButton';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../../hooks';
import {
  addBoard,
  editeBoardOperation,
} from '../../../../redux/tasks/boards/boardsOperations';

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
  'lightning-02',
  'colors',
  'hexagon-modal',
];

const backgroundsImages = [
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/e5l6os2xwkgtjmbkfuw6.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575674/react-octopus/desctopx2/heujomhkyiaavuoxqmiq.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575673/react-octopus/desctopx2/ikztmic75cfgbdhfuc1f.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/jsufvhlek6tdavzdmzvg.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575672/react-octopus/desctopx2/maopjnd6scj7z2wtcdog.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575673/react-octopus/desctopx2/muucbrq8v7kvywvio0jp.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575675/react-octopus/desctopx2/nrzdwyqz0x3phynrvqmp.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/pslkjxuhaxworen7rdyj.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/qgyeiqmm9zhlogcen0mj.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575673/react-octopus/desctopx2/t6vngzugp6qjakub1q0g.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575673/react-octopus/desctopx2/u9mmiv1ypl7b3yg9ka52.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575673/react-octopus/desctopx2/voiztzwnhjrvsdl7shsn.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/wympusczafztc5bg7kaz.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575675/react-octopus/desctopx2/yszsmlifjvpnpcwzxkul.webp',
  'http://res.cloudinary.com/dnqperiuu/image/upload/v1714575676/react-octopus/desctopx2/z7z9sfi0e3iuiqlzgjdn.webp',
];

const BoardForm = ({
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
          console.log('Saved');
        } else {
          if (item)
            dispatch(
              editeBoardOperation({
                boardId: item._id,
                body: {
                  title: columns.title,
                  iconId: columns.iconId,
                  background: columns.background,
                },
              })
            );
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

  const { title, iconId, background } = columns;

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
          <IconsList onChange={handleChange} items={icons} checked={iconId} />
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

export default BoardForm;
