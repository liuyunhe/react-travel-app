import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'
import { RootState } from './store'

// 自定义useSelector类型（解耦）
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
