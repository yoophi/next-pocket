import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  articles: [],
  offset: 0,
  error: null,
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    fetchPocketArticlesRequest: (state, action) => {
      state.isLoading = true
    },
    fetchPocketArticlesSuccess: (state, action) => {
      state.isLoading = false
      state.articles = [...state.articles, ...action.payload.data]
      state.offset = state.articles.length
    },
    fetchPocketArticlesError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchPocketArticlesRequest,
  fetchPocketArticlesSuccess,
  fetchPocketArticlesError,
} = articleSlice.actions

export default articleSlice.reducer
