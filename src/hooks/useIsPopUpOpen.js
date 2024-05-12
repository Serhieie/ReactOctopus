import { useSelector } from 'react-redux';
import {
  selectIsSideBarOpen,
  selectIsChangeThemePopUpOpen,
  selectIsMoveCardPopUpOpen,
  selectIsHelpPopUpOpen,
  selectIsFiltersOpen,
} from '../redux/popUps/popUpsSelectors.js';

export const useIsPopUpOpen = () => {
  const isSideBarOpen = useSelector(selectIsSideBarOpen);
  const isChangeThemePopUpOpen = useSelector(selectIsChangeThemePopUpOpen);
  const isMoveCardPopUpOpen = useSelector(selectIsMoveCardPopUpOpen);
  const isHelpPopUpOpen = useSelector(selectIsHelpPopUpOpen);
  const isFiltersModalOpen = useSelector(selectIsFiltersOpen);

  return {
    isFiltersModalOpen,
    isSideBarOpen,
    isChangeThemePopUpOpen,
    isMoveCardPopUpOpen,
    isHelpPopUpOpen,
  };
};
