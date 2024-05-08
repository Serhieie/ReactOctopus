import { useSelector } from 'react-redux';
import {
  selectIsSideBarOpen,
  selectIsChangeThemePopUpOpen,
  selectIsDeletePopUpOpen,
  selectIsAddBoardPopUpOpen,
  selectIsEditBoardPopUpOpen,
  selectIsAddColumnPopUpOpen,
  selectIsEditColumnPopUpOpen,
  selectIsAddCardPopUpOpen,
  selectIsEditCardPopUpOpen,
  selectIsMoveCardPopUpOpen,
  selectIsHelpPopUpOpen,
} from '../redux/popUps/popUpsSelectors.js';

export const useIsPopUpOpen = () => {
  const isSideBarOpen = useSelector(selectIsSideBarOpen);
  const isChangeThemePopUpOpen = useSelector(selectIsChangeThemePopUpOpen);
  const isDeletePopUpOpen = useSelector(selectIsDeletePopUpOpen);
  const isAddBoardPopUpOpen = useSelector(selectIsAddBoardPopUpOpen);
  const isEditBoardPopUpOpen = useSelector(selectIsEditBoardPopUpOpen);
  const isAddColumnPopUpOpen = useSelector(selectIsAddColumnPopUpOpen);
  const isEditColumnPopUpOpen = useSelector(selectIsEditColumnPopUpOpen);
  const isAddCardPopUpOpen = useSelector(selectIsAddCardPopUpOpen);
  const isEditCardPopUpOpen = useSelector(selectIsEditCardPopUpOpen);
  const isMoveCardPopUpOpen = useSelector(selectIsMoveCardPopUpOpen);
  const isHelpPopUpOpen = useSelector(selectIsHelpPopUpOpen);

  return {
    isSideBarOpen,
    isChangeThemePopUpOpen,
    isDeletePopUpOpen,
    isAddBoardPopUpOpen,
    isEditBoardPopUpOpen,
    isAddColumnPopUpOpen,
    isEditColumnPopUpOpen,
    isAddCardPopUpOpen,
    isEditCardPopUpOpen,
    isMoveCardPopUpOpen,
    isHelpPopUpOpen,
  };
};
