import React from 'react'
import "./Success_Popup.css"
import { TiTick } from "react-icons/ti";

const Successpopup = ({data}) => {
  return (
    <>
      <div className="success">
        <span className='flex items-center'>
          <TiTick style={{ fontSize: "2rem" }} />

          <h2>{data}</h2>
        </span>
      </div>
    </>
  );
}

export default Successpopup