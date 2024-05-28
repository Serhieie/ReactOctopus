export const customCleanerLS = (...args) => {
  args.forEach((key) => localStorage.removeItem(key));
};
