import { useSelector } from 'react-redux';
import {
  selectIsSideBarOpen,
  selectIsChangeThemePopUpOpen,
  selectIsMoveCardPopUpOpen,
  selectIsHelpPopUpOpen,
} from '../redux/popUps/popUpsSelectors.js';

export const useIsPopUpOpen = () => {
  const isSideBarOpen = useSelector(selectIsSideBarOpen);
  const isChangeThemePopUpOpen = useSelector(selectIsChangeThemePopUpOpen);
  const isMoveCardPopUpOpen = useSelector(selectIsMoveCardPopUpOpen);
  const isHelpPopUpOpen = useSelector(selectIsHelpPopUpOpen);

  return {
    isSideBarOpen,
    isChangeThemePopUpOpen,
    isMoveCardPopUpOpen,
    isHelpPopUpOpen,
  };
};
