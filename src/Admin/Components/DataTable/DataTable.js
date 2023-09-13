import React from 'react'
import './DataTable.css'
import { BsThreeDots } from 'react-icons/bs';

const DataTable = () => {
  return (
    <>
    
    <table className="popup-table">
              <tbody>
                <tr className='head-titles'>
                  <td>Emp.ID</td>
                  <td>PHOTO</td>
                  <td>Name</td>
                  <td>EMAIL</td>
                  <td>COUNTRY</td>
                  <td>DATE</td>
                  <td >ACTIONS</td>
                </tr>
                <tr className='clms'>
                  <td >#1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td className='dot-icon'><BsThreeDots/></td>
                </tr>
                <tr className='clms'>
                  <td>#2</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <td className='dot-icon'><BsThreeDots/></td>
                </tr>
                <tr className='clms'>
                  <td>#3</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <td className='dot-icon'><BsThreeDots/></td>
                </tr>
                <tr className='clms'>
                  <td>#4</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <td className='dot-icon'><BsThreeDots/></td>
                </tr>
              </tbody>
            </table>
         

      
    </>
  )
}

export default DataTable
