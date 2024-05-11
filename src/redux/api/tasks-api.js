import instance from './api';

export const getBoards = async () => {
  const { data } = await instance.get('/boards');
  return data;
};

export const getBoardById = async (id) => {
  const { data } = await instance.get(`/boards/${id}`);
  return data;
};

export const addBoard = async (body) => {
  const { data } = await instance.post('/boards/post', body);
  return data.result;
};

export const removeBoard = async (id) => {
  const { data } = await instance.delete(`/boards/delete/${id}`);
  return data;
};

export const editeBoard = async (boardId, body) => {
  const { data } = await instance.patch(`/boards/patch/${boardId}`, body);
  return data;
};

export const getColumns = async (boardId) => {
  const { data } = await instance.get(`/columns/${boardId}`);
  return data;
};

export const addColumn = async (body) => {
  const { data } = await instance.post(`/columns/post`, body);
  return data;
};

export const removeColumn = async (columnId) => {
  const { data } = await instance.delete(`/columns/delete/${columnId}`);
  return data;
};

export const editColumn = async (columnId, body) => {
  const { data } = await instance.patch(`/columns/patch/${columnId}`, body);
  return data;
};

export const getCards = async (boardId, columnId) => {
  const { data } = await instance.get(`/cards/${columnId}`);
  return data;
};

export const addCard = async (body) => {
  const { data } = await instance.post(`/cards/post`, body);
  return data;
};

export const removeCard = async (cardId) => {
  const { data } = await instance.delete(`/cards/delete/${cardId}`);
  return data;
};

export const editCard = async (cardId, body) => {
  const { data } = await instance.patch(`/cards/patch/${cardId}`, body);
  return data;
};

export const moveCard = async (cardId, body) => {
  const { data } = await instance.patch(`/cards/move/${cardId}`, body);
  return data;
};
