import React from 'react'
import "./Error_Popup.css"
import { BiError } from "react-icons/bi";

const ErrorPopup = ({data}) => {
  return (
    <>
      <div className="error">
        
        <BiError className="text-4xl" />

        <h2>{data}</h2>
      </div>
    </>
  );
}

export default ErrorPopup