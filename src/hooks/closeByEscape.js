import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsChangeThemePopUpOpen,
  setIsHelpPopUpOpen,
} from '../redux/popUps/popUpsSlice.js';
import { setIsSideBarOpen } from '../redux/popUps/popUpsSlice';

function useEscapeKeyToCloseModals(func) {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        if (func) func();
        else {
          dispatch(setIsChangeThemePopUpOpen(false));
          dispatch(setIsHelpPopUpOpen(false));
          dispatch(setIsSideBarOpen(false));
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, func]);

  return null;
}

export default useEscapeKeyToCloseModals;
