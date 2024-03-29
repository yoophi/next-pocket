import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  status: 'idle',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    fetchCountRequest: state => {
      state.status = 'loading'
    },
    fetchCountSuccess: (state, action) => {
      state.status = 'idle'
      state.value += action.payload.data
    },
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  fetchCountRequest,
  fetchCountSuccess,
} = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = state => state.counter.value

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = amount => (dispatch, getState) => {
  const currentValue = selectCount(getState())
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount))
  }
}

export default counterSlice.reducer
