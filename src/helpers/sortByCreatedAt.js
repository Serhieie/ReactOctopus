export const sortByCreatedAt = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
};
