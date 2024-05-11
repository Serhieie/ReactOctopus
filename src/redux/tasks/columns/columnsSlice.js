import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../tasksInitialState';
import * as columsOperations from './columnsOperations';

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  extraReducers: (builder) => {
    builder
      //FETCH COLUMNS
      .addCase(columsOperations.fetchColumns.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.fetchColumns.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false), (state.columns.items = payload);
        }
      )
      .addCase(columsOperations.fetchColumns.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })

      //ADD COLUMN(UPDATED BUT DIDNT CHECKED)
      .addCase(columsOperations.addColumnOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.addColumnOperation.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            (state.columns.items = payload.newItems);
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        columsOperations.addColumnOperation.rejected,
        (state, { payload }) => {
          (state.columns.isLoading = false), (state.columns.error = payload);
        }
      )

      //DELETE COLUMN(Updated)
      .addCase(columsOperations.deleteColumn.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.deleteColumn.fulfilled,
        (state, { payload }) => {
          (state.columns.isLoading = false),
            (state.columns.items = payload.items);
          state.boards.active = payload.newActive;
        }
      )
      .addCase(columsOperations.deleteColumn.rejected, (state, { payload }) => {
        (state.columns.isLoading = false), (state.columns.error = payload);
      })

      //EDIT COLUMN
      .addCase(columsOperations.editColumnOperation.pending, (state) => {
        (state.columns.isLoading = true), (state.columns.error = null);
      })
      .addCase(
        columsOperations.editColumnOperation.fulfilled,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.columns.items = payload.newItems;
          state.boards.active = payload.newActive;
        }
      )
      .addCase(
        columsOperations.editColumnOperation.rejected,
        (state, { payload }) => {
          state.columns.isLoading = false;
          state.columns.error = payload;
        }
      );
  },
});

export default columnsSlice.reducer;
