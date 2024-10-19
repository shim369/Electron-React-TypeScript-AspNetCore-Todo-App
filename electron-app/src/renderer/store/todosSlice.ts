import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface TodosState {
  todos: Todo[]
  selectedCategory: string
  statusCounts: Record<number, number>
}

const initialState: TodosState = {
  todos: [],
  selectedCategory: localStorage.getItem('category') || '0',
  statusCounts: { 0: 0, 1: 0, 2: 0 }
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:5266/tasks')
  if (!response.ok) throw new Error('Network response was not ok')
  const data: Todo[] = await response.json()
  return data
})

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo: Todo) => {
  const response = await fetch('http://localhost:5266/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo)
  })
  if (!response.ok) throw new Error('Failed to add new task')
  const data = await response.json()
  return data
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  const response = await fetch(`http://localhost:5266/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to delete task')
  return id
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo: Todo) => {
  const response = await fetch(`http://localhost:5266/tasks/${updatedTodo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo)
  })
  if (!response.ok) throw new Error('Failed to update task')
  const data = await response.json()
  return data
})

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      localStorage.setItem('category', action.payload)
    },
    updateStatusCounts: (state) => {
      state.statusCounts = state.todos.reduce(
        (acc, todo) => {
          acc[todo.status] += 1
          return acc
        },
        { 0: 0, 1: 0, 2: 0 }
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload)
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) {
          state.todos[index] = action.payload
        }
      })
  }
})

export const { setSelectedCategory, updateStatusCounts } = todosSlice.actions
export default todosSlice.reducer
export type { TodosState }
