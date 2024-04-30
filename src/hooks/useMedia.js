import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

//usage
// import { useMedia } from './useMedia';
//const { isMobile, isTablet, isDesktop } = useMedia();
//...
//return (
//   <div>
//     {isMobile && <p>Мобільний контент</p>}
//     {isTablet && <p>Контент для планшетів</p>}
//     {isDesktop && <p>Контент для настільних комп'ютерів</p>}
//   </div>
// );

export const useMedia = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' }) && !isDesktop;
  const isMobile = !isTablet && !isDesktop;

  return useMemo(
    () => ({ isMobile, isTablet, isDesktop }),
    [isMobile, isTablet, isDesktop]
  );
};
