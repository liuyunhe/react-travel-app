import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkout } from '../shoppingCart/slice'

interface OrderState {
  loading: boolean
  error: string | null
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (parameters: { jwt: string; orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `/api/orders/${parameters.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
    return data
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [placeOrder.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false
      state.error = action.payload
    },
    // 在调用shoppingCartSlice中的checkout时，将返回的订单信息保存在currentOrder
    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
