import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsHelpPopUpOpen } from '../redux/popUps/popUpsSlice.js';
import { setIsSideBarOpen } from '../redux/popUps/popUpsSlice';

function useClickOnBackdropToCloseModals(func, isPopUpOpen) {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(event) {
      if (event.target.dataset.id === 'modal-backdrop') {
        if (func) func();
        else {
          dispatch(setIsSideBarOpen(false));
          dispatch(setIsHelpPopUpOpen(false));
        }
      }
      if (event.target.dataset.id !== 'move-popUp' && isPopUpOpen) {
        func();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch, func, isPopUpOpen]);

  return null;
}

export default useClickOnBackdropToCloseModals;
