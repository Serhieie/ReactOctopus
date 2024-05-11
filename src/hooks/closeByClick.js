import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsHelpPopUpOpen } from '../redux/popUps/popUpsSlice.js';
import { setIsSideBarOpen } from '../redux/popUps/popUpsSlice';

function useClickOnBackdropToCloseModals() {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(event) {
      if (event.target.dataset.id === 'modal-backdrop') {
        console.log('backdrop clicked');
        dispatch(setIsSideBarOpen(false));
        dispatch(setIsHelpPopUpOpen(false));
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch]);

  return null;
}

export default useClickOnBackdropToCloseModals;
