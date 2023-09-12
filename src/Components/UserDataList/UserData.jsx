import React from 'react'
import './UserData.css'
import {AiOutlineDownload} from "react-icons/ai"


const UserData = () => {
  return (
    <>
        <div className="wrapper-right">
      <form>
        <div className="dash-right-top">
          <div className="pathname">
            <h3>
              <span style={{ color: "skyblue" }}>Personalize</span>{" "}
              <span>/ History Data</span>
            </h3>
          </div>
        </div>
        <div className="content-container">
          <div className="heading-container">
            <h4>History data</h4>
            <div style={{ width: "90px" }} className="underline-grey"></div>
          </div>

          <div>
            <a
              style={{ textDecoration: "none" }}
              href="/path/to/your/template.xlsx"
              download
            >
              <button className="download-button">
                Download Template{" "}
                <AiOutlineDownload className="history-data-download-icon" />
              </button>
            </a>
            <div className="flex items-center ms-16">
              <label
                style={{
                  color: "gray",
                  backgroundColor: "white",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }}
                className="upload-label flex  "
              >
                Already have the template?{" "}
                <label
                  style={{
                    color: "blue", // Change the text color to blue to indicate a link
                    cursor: "pointer", // Add a cursor style to indicate it's clickable
                    textDecoration: "underline", // Add underline style to indicate it's a link
                  }}
                  htmlFor="file-input"
                >
                  Upload now{" "}
                  <input
                    type="file"
                    accept=".xlsx"
                    id="file-input"
                    style={{
                      display: "none", // Hide the input element
                    }}
                 
                  />{" "}
                </label>
              </label>
            </div>

          
              <div className="uploaded-table-container">
                <table>
                  <thead>
                    <tr>
                      
                        <th ></th>
                  
                    </tr>
                  </thead>
                  <tbody>
                   
                      <tr>
                       
                          <td ></td>
                      
                      </tr>
                   
                  </tbody>
                </table>
              </div>
           
          </div>
        </div>
      </form>
    </div>

    </>
  )
}

export default UserData
