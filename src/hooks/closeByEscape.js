import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsChangeThemePopUpOpen,
  setIsHelpPopUpOpen,
} from '../redux/popUps/popUpsSlice.js';
import { setIsSideBarOpen } from '../redux/popUps/popUpsSlice';

function useEscapeKeyToCloseModals() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        console.log(event.keyCode);
        dispatch(setIsChangeThemePopUpOpen(false));
        dispatch(setIsHelpPopUpOpen(false));
        dispatch(setIsSideBarOpen(false));
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return null;
}

export default useEscapeKeyToCloseModals;
