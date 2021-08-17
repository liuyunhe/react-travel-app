import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'
import axios from 'axios'
import {
  productList1,
  productList2,
  productList3
} from '../../pages/home/mockups'

// 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START'
// 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  'FETCH_RECOMMEND_PRODUCTS_SUCCESS'
// 推荐信息api调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL'

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL
  payload: any
}

export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction

export const fetchRecommendProductStartActionCreator =
  (): FetchRecommendProductStartAction => {
    return {
      type: FETCH_RECOMMEND_PRODUCTS_START
    }
  }

export const fetchRecommendProductSuccessActionCreator = (
  data
): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendProductFailActionCreator = (
  error
): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error
  }
}

// 增加中间件处理副作用和异步
export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
  async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator())
    try {
      const { data } = await axios.get('/api/productCollections')
      dispatch(fetchRecommendProductSuccessActionCreator(data))
    } catch (error) {
      dispatch(
        fetchRecommendProductSuccessActionCreator([
          productList1,
          productList2,
          productList3
        ])
      )
    }
  }
