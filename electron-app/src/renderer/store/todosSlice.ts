import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
  },
})

export const { addTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer
