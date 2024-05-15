import { useEffect } from 'react';

export const useEscapeKeyToClosePopUps = (func, isPopUpOpen) => {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        if (isPopUpOpen) func();
      }
    }
    function handleClick(event) {
      if (event.target.dataset.id === 'move-popUp') {
        if (isPopUpOpen) func();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [func, isPopUpOpen]);
  return null;
};

export default useEscapeKeyToClosePopUps;
