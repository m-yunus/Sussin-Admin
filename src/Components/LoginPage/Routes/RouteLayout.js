import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../LoginPage'
import Dashboard from '../Dashboard/Dashboard'

const RouteLayout = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default RouteLayout