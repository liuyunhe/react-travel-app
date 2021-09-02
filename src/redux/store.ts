// import { createStore, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
// import thunk from 'redux-thunk'
import { actionLog, changeLanguage } from './middlewares'
import { productDetailSlice } from './productDetail/slice'
import { productSearchSlice } from './productSearch/slice'
import { userSlice } from './user/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer
})

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk, actionLog, changeLanguage)
// )

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(), // 默认开启redux-thunk
    actionLog,
    changeLanguage
  ],
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store
