import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import {
  DetailPage,
  HomePage,
  RegisterPage,
  SignInPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage
} from './pages'
import { useSelector } from './redux/hooks'

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/signIn' }} />
    )
  }
  return <Route render={routeComponent} {...rest} />
}

const App: React.FC = () => {
  const jwt = useSelector((state) => state.user.token)
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
          <Route path="/search/:keywords?" component={SearchPage}></Route>
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/placeOrder"
            component={PlaceOrderPage}
          />
          <Route render={() => <h1>404 not found,页面去火星了</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
