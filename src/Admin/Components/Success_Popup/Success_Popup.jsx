import React from 'react'
import "./Success_Popup.css"
import { TiTick } from "react-icons/ti";

const Success_Popup = () => {
  return (
    <>
      <div className="success">
        <span className='flex items-center'>
          <TiTick style={{ fontSize: "2rem" }} />

          <h2>Log in Success</h2>
        </span>
      </div>
    </>
  );
}

export default Success_Popup