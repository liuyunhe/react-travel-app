import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    paramaters: {
      email: string
      password: string
    },
    thunkApi
  ) => {
    const { data } = await axios.post(`/api/auth/login`, {
      email: paramaters.email,
      password: paramaters.password
    })
    return data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.token = action.payload
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
    [signIn.pending.type]: (state) => {
      // return { ...state, loading: true }
      // immer
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      // const ddd = action.payload
      state.loading = false
      state.error = action.payload
    }
  }
})
