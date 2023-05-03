import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductDetailState {
  loading: boolean
  error: string | null
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkApi) => {
    //   thunkApi.dispatch(productDetailSlice.actions.fetchStart())
    //   try {
    //     const { data } = await axios.get(`/api/touristRoutes/${touristRouteId}`)
    //     thunkApi.dispatch(productDetailSlice.actions.fetchSuccess(data))
    //   } catch (e) {
    //     thunkApi.dispatch(productDetailSlice.actions.fetchFail(e))
    //   }
    // }
    //返回promise自动处理life状态
    const { data } = await axios.get(`/api/touristRoutes/${touristRouteId}`)
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // 这里reducer 和 action 捆绑在一起
    // 每个函数对应一个action
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
  // promise life action
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    }
  }
})
