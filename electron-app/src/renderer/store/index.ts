import { configureStore } from '@reduxjs/toolkit'
import TodosState from '../store/todosSlice';

export const store = configureStore({
  reducer: {
    todos: TodosState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
