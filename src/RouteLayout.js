import React from 'react'
import Login from './LoginPage/Login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RouteLayout = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default RouteLayout
