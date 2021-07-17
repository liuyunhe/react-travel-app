import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DetailPage, HomePage, RegisterPage, SignInPage } from './pages'

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        {/* <Switch>: 路径的切换以页面为单位，不要页面堆叠  */}
        <Switch>
          {/* exact: 精确 */}
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/signIn" component={SignInPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/detail/:touristRouteId" component={DetailPage}></Route>
          <Route render={() => <h1>404 not found,页面去火星了</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
