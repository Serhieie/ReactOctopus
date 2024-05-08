import instance from './api';

export const getBoards = async () => {
  const { data } = await instance.get('/boards');
  console.log(data);
  return data;
};

export const addBoard = async (body) => {
  const { data } = await instance.post('/boards', body);
  return data;
};

export const removeBoard = async (id) => {
  const { data } = await instance.delete(`/boards/${id}`);
  return data;
};

export const editeBoard = async (boardId, body) => {
  const { data } = await instance.patch(`/boards/${boardId}`, body);
  return data;
};

export const getColumns = async (boardId) => {
  const { data } = instance.get(`/boards/${boardId}/columns`);
  return data;
};

export const addColumn = async (boardId, body) => {
  const { data } = instance.post(`/boards/${boardId}/columns`, body);
  return data;
};

export const removeColumn = async (boardId, columnId) => {
  const { data } = instance.delete(`/boards/${boardId}/columns/${columnId}`);
  return data;
};

export const editeColumn = async (boardId, columnId, body) => {
  const { data } = instance.patch(
    `/boards/${boardId}/columns/${columnId}`,
    body
  );
  return data;
};

export const getCards = async (boardId, columnId) => {
  const { data } = await instance.get(
    `/boards/${boardId}/columns/${columnId}/cards`
  );
  return data;
};

export const addCard = async (boardId, columnId, body) => {
  const { data } = await instance.post(
    `/boards/${boardId}/columns/${columnId}/cards`,
    body
  );
  return data;
};

export const removeCard = async (boardId, columnId, cardId) => {
  const { data } = await instance.delete(
    `/boards/${boardId}/columns/${columnId}/cards/${cardId}`
  );
  return data;
};

export const editeCard = async (boardId, columnId, cardId, body) => {
  const { data } = await instance.patch(
    `/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
    body
  );
  return data;
};
