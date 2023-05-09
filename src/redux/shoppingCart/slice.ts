import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any[]
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}

export const getShoppingCart = createAsyncThunk(
  'shoppingCart/getShoppingCart',
  async (jwt: string, thunkApi) => {
    // thunkApi.dispatch(shoppingCartSlice.actions.fetchStart())
    // try {
    //   const { data: { shoppingCartItems} } = await axios.get(`/api/shoppingCart`,, {
    //     headers: {
    //       Authorization: `bearer ${jwt}`
    //     }
    //   })
    //   thunkApi.dispatch(shoppingCartSlice.actions.fetchSuccess(shoppingCartItems))
    // } catch (e) {
    //   thunkApi.dispatch(shoppingCartSlice.actions.fetchFail(e))
    // }

    // 返回promise自动处理life状态
    const { data } = await axios.get(`/api/shoppingCart`, {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    })
    return data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(
  'shoppingCart/addShoppingCartItem',
  async (parameters: { jwt: string; touristRouteId: string }, thunkApi) => {
    // 返回promise自动处理life状态
    const { data } = await axios.post(
      `/api/shoppingCart/items`,
      { touristRouteId: parameters.touristRouteId },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
    return data.shoppingCartItems
  }
)

export const checkout = createAsyncThunk(
  'shoppingCart/checkout',
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(`/api/shoppingCart/checkout`, null, {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    })
    return data
  }
)

export const clearShoppingCartItem = createAsyncThunk(
  'shoppingCart/clearShoppingCartItem',
  async (parameters: { jwt: string; itemIds: number[] }, thunkApi) => {
    // 返回promise自动处理life状态
    return await axios.delete(
      `/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
  }
)

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
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
      state.items = action.payload
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
    [getShoppingCart.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [getShoppingCart.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.items = []
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    }
  }
})
