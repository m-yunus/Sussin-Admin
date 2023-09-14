import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../Admin/Components/LoginPage/LoginPage";

import Dashboard from "../Admin/Components/Dashboard/Dashboard";
import DashHome from "../Admin/Components/Dash_Home/DashHome";
import Categories from "../Admin/Components/Categories/Categories";
import Products from "../Admin/Components/products/Products";
import Users from "../Admin/Components/Users/Users";
import VendorProfile from "../Admin/Components/Vendor_profile/VendorProfile";
import Orders from "../Admin/Components/Orders/Orders";
import Vendorlogin from "../Vendor/Components/Vendorlogin/Vendorlogin";
import VendorDashboard from "../Vendor/Components/VendorDashboard/VendorDashboard";
import VendorDashprofile from "../Vendor/Components/VendorProfile/Vendorprofile";
import VendorProducts from "../Vendor/Components/VendorProducts/VendorProducts";



const RouteLayout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
      <Route path="/vendorlogin" element={<Vendorlogin/>}/>
     
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<DashHome />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="vendorProfile" element={<VendorProfile />} />
            <Route path="order" element={<Orders />} />

          </Route>

        <Route path="/vendorDashboard/*" element={<VendorDashboard/>}>
        <Route index element={<VendorDashprofile/>}/>
        <Route path="products" element={<VendorProducts/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteLayout;
