import React from 'react'
import "./Error_Popup.css"
import { BiError } from "react-icons/bi";

const Error_Popup = () => {
  return (
    <>
      <div className="error">
        
        <BiError className="text-4xl" />

        <h2>Invalid user name</h2>
      </div>
    </>
  );
}

export default Error_Popup