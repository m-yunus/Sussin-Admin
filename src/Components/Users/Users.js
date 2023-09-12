import React, { useState } from 'react'
import './User.css'
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import {BiDotsVerticalRounded } from 'react-icons/bi';
import UserCreationModal from '../../Layout/Sidebar/UserCreationModal/UserCreationModal';

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
   
  return (
    <>
     <div className="bg-gray-100 h-full w-full ">
        <div className='w-full h-24 flex p-4'>
        <button onClick={toggleModal}
        className="bg-blue-500 text-white px-2 text-sm h-8 w-32 text-center py-2 rounded hover:bg-blue-600"
       
      >
        Create User
      </button>
        </div>



        <table className="popup-table ms-2">
              <tbody>
                <tr className='table-title'>
                  <td className='no'>NO</td>
                  <td>NAME</td>
                  <td>EMAIL</td>
                  <td>PASSWORD</td>
                  <td className='action'>ACTIONS</td>
                  
                 
                </tr>
                <tr>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <BiDotsVerticalRounded className='delete-icon'/>
                  </td>
                  
                </tr>
                <tr>
                  <td>2</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>

                 
                  <td>
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <BiDotsVerticalRounded className='delete-icon'/>
                  </td>
                  
                
                </tr>
                <tr>
                  <td>3</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <BiDotsVerticalRounded className='delete-icon'/>
                  </td>
                </tr>
               
              </tbody>
            </table>
    
      </div>
      <UserCreationModal isOpen={isModalOpen} onClose={toggleModal} />

     
    </>
  )
}

export default Users