const setPopUpState = (state, popUpName, isOpen) => {
  state[popUpName] = isOpen;
  if (!isOpen) return;
  Object.keys(state).forEach((key) => {
    if (key !== popUpName && Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = !isOpen;
    }
  });
};

const setChangeThemePopUpState = (state, isOpen) => {
  state.isChangeThemePopUpOpen = isOpen;
  if (!isOpen) return;
  state.isDeletePopUpOpen = !isOpen;
  state.isAddBoardPopUpOpen = !isOpen;
  state.isEditBoardPopUpOpen = !isOpen;
  state.isAddColumnPopUpOpen = !isOpen;
  state.isEditColumnPopUpOpen = !isOpen;
  state.isAddCardPopUpOpen = !isOpen;
  state.isEditCardPopUpOpen = !isOpen;
};

const setMoveCardPopUpState = (state, isOpen) => {
  state.isMoveCardPopUpOpen = isOpen;
  if (!isOpen) return;
  state.isEditCardPopUpOpen = !isOpen;
  state.isAddCardPopUpOpen = !isOpen;
  state.isEditColumnPopUpOpen = !isOpen;
  state.isAddColumnPopUpOpen = !isOpen;
  state.isEditBoardPopUpOpen = !isOpen;
  state.isAddBoardPopUpOpen = !isOpen;
  state.isDeletePopUpOpen = !isOpen;
};

export default {
  setPopUpState,
  setChangeThemePopUpState,
  setMoveCardPopUpState,
};
