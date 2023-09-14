import React from 'react'
import './DataTable.css'
import { BsThreeDots } from 'react-icons/bs';

const DataTable = () => {
  return (
  
    
    
    <table className="super-admin-table px-10">
            <tr className='table-titles'>
            <td className="text-center">
                <input type="checkbox" name="" id="" />
              </td>
              <td className='table-title'>ID</td>
              <td className='table-title'>PHOTO</td>
              <td className='table-title'>NAME</td>
              <td className='table-title'>EMAIL</td>
              <td className='table-title' > COUNTRY</td>
              <td className='table-title'  >DATE</td>
              <td className='table-title'  > STATUS</td>
              <td className='table-title'  >ACTION</td>
            </tr>
            
            <tr className='clms'>
              
              
            <td className="text-center">
                <input type="checkbox" name="" id="" />
              </td>
              <td className='clm'>#1</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              
              <td className='table-icon' >
               <BsThreeDots/>
              </td>
            </tr>
            <tr className='clms' >
            <td className="text-center">
              <input type="checkbox" name="" id="" />
              </td>
              <td className='clm'>#2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
              <td className='table-icon' >
               <BsThreeDots/>
              </td>
            </tr>
            <tr className='clms'>
            <td className="text-center">
                <input type="checkbox" name="" id="" />
              </td>
              <td
              className='clm'>#3</td>
              <td className='clm1'></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
              <td className='table-icon' >
               <BsThreeDots/>
              </td>
            </tr>
            <tr className='clms' >
            <td className="text-center">
                <input type="checkbox" name="" id="" />
              </td>
              <td className='clm'>#4</td>
              <td ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
              <td className='table-icon' >
               <BsThreeDots/>
              </td>
            </tr>
           
          </table>

      
   
  )
}

export default DataTable
