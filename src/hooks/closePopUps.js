import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useEscapeKeyToClosePopUps(func, isPopUpOpen) {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        console.log(isPopUpOpen);
        if (isPopUpOpen) func();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, func, isPopUpOpen]);

  return null;
}

export default useEscapeKeyToClosePopUps;
