import {
  CHANGE_LANGUAGE,
  LanguageActionTypes
} from './../language/languageActions'
import { Middleware } from 'redux'
import i18n from 'i18next'

export const changeLanguage: Middleware =
  (store) => (next) => (action: LanguageActionTypes) => {
    if (action.type === CHANGE_LANGUAGE) {
      i18n.changeLanguage(action.payload)
    }
    next(action)
  }
