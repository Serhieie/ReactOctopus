import { useEffect } from 'react';

export const useEscapeKeyToClosePopUps = (func, isPopUpOpen) => {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        if (isPopUpOpen) func();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [func, isPopUpOpen]);
  return null;
};

export default useEscapeKeyToClosePopUps;
