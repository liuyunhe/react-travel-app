import i18n from 'i18next'
import {
  CHANGE_LANGUAGE,
  ADD_LANGUAGE,
  LanguageActionTypes
} from './languageActions'

export interface languageState {
  language: 'en' | 'zh'
  languageList: { name: string; code: string }[]
}

const defaultState: languageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ]
}

// reducer是纯函数，不可以处理副作用
const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n.changeLanguage(action.payload) // 这样处理是不标准的，有副作用
      return { ...state, language: action.payload }
    case ADD_LANGUAGE:
      return {
        ...state,
        languageList: [...state.languageList, action.payload]
      }
    default:
      return state
  }
}

export default languageReducer
