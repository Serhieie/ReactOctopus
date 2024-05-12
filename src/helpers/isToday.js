export const isToday = (dateString) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  const isSameYear = date.getFullYear() === currentDate.getFullYear();
  const isSameMonth = date.getMonth() === currentDate.getMonth();
  const isSameDay = date.getDate() === currentDate.getDate();

  return isSameYear && isSameMonth && isSameDay;
};

export const toodayDate = (value) => {
  if (value) {
    const date = new Date(value);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();

    return `Tooday, ${month} ${day}`;
  } else {
    const today = new Date();
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const day = today.getDate();
    return `Tooday, ${month} ${day}`;
  }
};
