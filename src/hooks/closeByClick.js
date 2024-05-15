import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsHelpPopUpOpen,
  setIsUserModalOpen,
  setIsSideBarOpen,
} from '../redux/popUps/popUpsSlice.js';

export const useClickOnBackdropToCloseModals = (func) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(event) {
      if (event.target.dataset.id === 'modal-backdrop') {
        if (func) func();
        else {
          dispatch(setIsUserModalOpen(false));
          dispatch(setIsSideBarOpen(false));
          dispatch(setIsHelpPopUpOpen(false));
        }
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [dispatch, func]);

  return null;
};
