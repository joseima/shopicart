import { useContext } from 'react';
import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom';
import { ShopiContextProvider, initializeLocalStorage, ShopiContext } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import MyOrder from '../MyOrder';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu';

import './App.css'


const AppRoutes = () => {
  const context = useContext(ShopiContext)
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = Object.keys(context.account).length === 0
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState
  const isUserSignOut = context.signOut || parsedSignOut

  let routes = useRoutes([
    { path: '/', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/womens-clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/mens-clothes', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/electronics', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/jewelery', element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'} />},
    { path: '/my-account', element: <MyAccount />},
    { path: '/my-order', element: <MyOrder />},
    { path: '/my-orders', element: <MyOrders />},
    { path: '/my-orders/last', element: <MyOrder />},
    { path: '/my-orders/:id', element: <MyOrder />},
    { path: '/sign-in', element: <SignIn />},
    { path: '/*', element: <NotFound />}
  ])
  return routes
}

const App = () => {
  initializeLocalStorage()

  return (
    <ShopiContextProvider>
      <BrowserRouter>
          <Navbar/>
          <AppRoutes/>
          <CheckoutSideMenu />
      </BrowserRouter>
    </ShopiContextProvider>
  )
}

export default App
