import { useSelector } from 'react-redux';
import {
  selectIsSideBarOpen,
  selectIsChangeThemePopUpOpen,
  selectIsMoveCardPopUpOpen,
  selectIsHelpPopUpOpen,
  selectIsFiltersOpen,
} from '../redux/popUps/popUpsSelectors.js';

export const useIsPopUpOpen = () => {
  const isSidebarOpen = useSelector(selectIsSideBarOpen);
  const isChangeThemePopUpOpen = useSelector(selectIsChangeThemePopUpOpen);
  const isMoveCardPopUpOpen = useSelector(selectIsMoveCardPopUpOpen);
  const isHelpPopUpOpen = useSelector(selectIsHelpPopUpOpen);
  const isFiltersOpen = useSelector(selectIsFiltersOpen);

  return {
    isFiltersOpen,
    isSidebarOpen,
    isChangeThemePopUpOpen,
    isMoveCardPopUpOpen,
    isHelpPopUpOpen,
  };
};
