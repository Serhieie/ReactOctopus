import avatarDark from '../assets/user/userDark.png';
import avatarLight from '../assets/user/userLight.png';
import avatarViolet from '../assets/user/userViolet.png';

export const setUserPlaceholder = (theme) => {
  switch (theme) {
    case 'dark':
      return avatarDark;
    case 'light':
      return avatarLight;
    case 'violet':
      return avatarViolet;
    default:
      return '';
  }
};
