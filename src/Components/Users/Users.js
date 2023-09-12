import React, { useState } from 'react'
import './User.css'
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
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



        <table className="popup-table">
              <tbody>
                <tr>
                  <td className='no'>NO</td>
                  <td>NAME</td>
                  <td>EMAIL</td>
                  <td>PASSWORD</td>
                  
                 
                </tr>
                <tr>
                  <td>1</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <MdDelete className='delete-icon'/>
                  
                  
                </tr>
                <tr>
                  <td>2</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>

                 
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <MdDelete className='delete-icon'/>
                  
                  
                
                </tr>
                <tr>
                  <td>3</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <MdDelete className='delete-icon'/>
                 
                  
                </tr>
                <tr>
                  <td>4</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  
                  <BiSolidMessageSquareEdit className='edit-icon'/>
                  <MdDelete className='delete-icon'/>
                
                  
                </tr>
              </tbody>
            </table>
    
      </div>
      <UserCreationModal isOpen={isModalOpen} onClose={toggleModal} />

     
    </>
  )
}

export default Users