export const isToday = (dateString) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  const isSameYear = date.getFullYear() === currentDate.getFullYear();
  const isSameMonth = date.getMonth() === currentDate.getMonth();
  const isSameDay = date.getDate() === currentDate.getDate();

  return isSameYear && isSameMonth && isSameDay;
};
