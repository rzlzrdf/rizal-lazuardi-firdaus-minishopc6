import React, {useEffect} from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout/Layout'
import Product from "./Page/Product"
import ProductDetail from "./Page/ProductDetail"
import ShoppingCart from "./Page/ShoppingCart"
import Register from "./Page/Register"
import Login from "./Page/Login"
import jwtDecode from "jwt-decode"
import axios from "axios"
import { useDispatch } from "react-redux"
import userSlice from "./store/user"
import ProtectedRoute from "./Component/HOC/ProtectedRoute"
import UnprotectedRoute from "./Component/HOC/UnprotectedRoute"
import Logout from "./Page/Logout"

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    try {
      const token = localStorage.getItem('minishopAccessToken')
      const userData = jwtDecode(token)
      axios.get(`http://localhost:4000/users/${userData.sub}`)
      .then(res => {
        dispatch(userSlice.actions.addUser({
          userData: res.data
        }))
      })
    } catch {}    
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            
            <Route index element={<h1>Home</h1>} />
            <Route path="products/">
              <Route index element={<Product />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>            
            <Route path="categories" element={<h1>Categories</h1>} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="logout" element={<Logout />} />

            <Route path="/" element={<UnprotectedRoute />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="order-history" element={<h1>Order History</h1>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
