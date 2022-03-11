import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUCTodo } from '../core/usecase/todos';

export interface IVMTodo {
  todos: IUCTodo[]
}

export const counterSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    todos: [],
  } as IVMTodo,
  reducers: {
    set: (state, action: PayloadAction<IUCTodo[]>) => {
      state.todos = action.payload;
    },
  },
})

export const { set: setTodos } = counterSlice.actions;

export default counterSlice.reducer;