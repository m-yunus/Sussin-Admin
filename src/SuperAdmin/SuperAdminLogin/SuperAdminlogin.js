import React from 'react'
import SuperAdminLoginform from './SuperAdminLoginform'
import Logo from "../../assets/images/Logo 1.png"
import Right_img from "../../assets/images/superadmin.jpg"


const SuperAdminlogin = () => {
  return (
    <div className="lg:flex">
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="p-4  bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
              <img src={Logo} alt="sussin logo" className='object-cover w-28 h-28' />
          </div>
        </div>
      </div>
    <SuperAdminLoginform/>
    </div>
    <div className="hidden lg:flex items-center justify-center flex-1 h-screen bg-cover " style={{backgroundImage: `url(${Right_img})`}}>
      {/* Place your content here */}
    </div>
  </div>
  )
}

export default SuperAdminlogin