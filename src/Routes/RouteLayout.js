import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from '../Components/Dashboard/Dashboard'
import LoginPage from '../Components/LoginPage/LoginPage'
import DashHome from '../Components/Dash_Home/DashHome'
import Categories from '../Components/Categories/Categories'
import Products from '../Components/products/Products'
import Users from '../Components/Users/Users'
import VendorProfile from '../Components/Vendor_profile/VendorProfile'
import Orders from '../Components/Orders/Orders'
import UserData from '../Components/UserDataList/UserData'






const RouteLayout = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}>
          <Route path='dashhome' index element={<DashHome/>}/>
          <Route path='categories' element={<Categories/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='vendorProfile' element={<VendorProfile/>}/>
          <Route path='order' element={<Orders/>}/>
          <Route path='data' element={<UserData/>}/>
          
          
          


        </Route>
        
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouteLayout