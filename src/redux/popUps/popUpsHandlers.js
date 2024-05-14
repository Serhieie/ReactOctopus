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
  state.isFiltersOpen = !isOpen;
};

const setIsFiltersOpenState = (state, isOpen) => {
  state.isFiltersOpen = isOpen;
  if (!isOpen) return;
  state.isChangeThemePopUpOpen = !isOpen;
};

export default {
  setPopUpState,
  setChangeThemePopUpState,
  setIsFiltersOpenState,
};
