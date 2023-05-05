// import { createStore, applyMiddleware, combineReducers } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
// import thunk from 'redux-thunk'
import { actionLog, changeLanguage } from './middlewares'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { shoppingCartSlice } from './shoppingCart/slice'
import { userSlice } from './user/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 登录持久化
const persistConfig = {
  key: 'root', // 命名空间
  storage,
  whiteList: ['user'] // 指向userSlice.reducer
}

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer
})

// 创建持久化reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk, actionLog, changeLanguage)
// )

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(), // 默认开启redux-thunk
    actionLog,
    changeLanguage
  ],
  devTools: true
})

// 创建持久化store
const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

const rootStore = { store, persistor }

export default rootStore
