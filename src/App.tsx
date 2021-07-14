import React from 'react'
import style from './App.module.css'
import { Header, Footer } from './components'

const App: React.FC = () => {
  return (
    <div className={style.App}>
      <Header />
      <Footer />
    </div>
  )
}

export default App
