import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductSearchState {
  loading: boolean
  error: string | null
  data: any
  pagination: any
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null
}

export const searchProduct = createAsyncThunk(
  'productSearch/searchProduct',
  async (
    params: {
      keywords: string
      nextPage: number | string
      pageSize: number | string
    },
    thunkApi
  ) => {
    let url = `/api/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`
    if (params.keywords) {
      url += `&pageSize=${params.keywords}`
    }
    const response = await axios.get(url)
    return {
      data: response.data,
      pagination: JSON.stringify(response.headers['x-pagination'])
    }
  }
)

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    }
  },
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
      state.error = null
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    }
  }
})
