import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setIsHelpPopUpOpen,
  setIsUserModalOpen,
  setIsSideBarOpen,
} from '../redux/popUps/popUpsSlice.js';

function useClickOnBackdropToCloseModals(func) {
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
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch, func]);

  return null;
}

export default useClickOnBackdropToCloseModals;
