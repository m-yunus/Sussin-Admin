import React, { useState } from 'react'
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
    
      </div>
      <UserCreationModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  )
}

export default Users