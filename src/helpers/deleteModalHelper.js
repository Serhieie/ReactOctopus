export const getEntityName = (item) => {
  switch (item) {
    case 'column':
      return 'column';
    case 'card':
      return 'card';
    case 'board':
      return 'board';
    default:
      return '';
  }
};
