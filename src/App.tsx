import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { HomePage } from './pages'

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Route path="/" component={HomePage}></Route>
      </BrowserRouter>
    </div>
  )
}

export default App
