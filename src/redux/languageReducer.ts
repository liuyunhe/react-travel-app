interface languageState {
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

const languageReducer = (state = defaultState, action: any) => {
  return state
}

export default languageReducer
