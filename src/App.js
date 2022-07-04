import React from 'react'
import Home from "./pages/Home"
import ProductList  from "./pages/ProductList"
import Product from "./pages/Product"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import Success from "./pages/Success"
import RegisterSuccess from "./components/RegisterSuccess"
import {
  Routes,
  Route,Navigate 
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user=useSelector(state=>state.user.currentUser);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="products" element={<ProductList/>}>
          <Route path=":category" element={<ProductList />}/>
        </Route>
        <Route path="product" element={<Product/>}>
          <Route path=":id" element={<Product/>}/>
        </Route>       
        <Route path="cart" element={user?<Cart/>:<Navigate replace to="/"/>}/>
        <Route path="profile" element={user?<Profile/>:<Navigate replace to="/"/>}/>
        <Route path="success" element={<Success/>}/>
        <Route path="login" element={user?<Navigate replace to="/"/>:<Login/>}/>
        <Route path="register" element={user?<Navigate replace to="/"/>:<Register/>}/>
        <Route path="registersuccess" element={<RegisterSuccess/>}/>
      </Routes>
    </div>
  )
}

export default App;