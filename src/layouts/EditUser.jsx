import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const EditUser = ({ editUserDetails, setEditUser }) => {
  const [details, setDetails] = useState(editUserDetails)

  const jwtToken = Cookies.get('jwt')

  const user = useSelector((state) => state.user)

  const handleChange = (event) => {
    const { name, value } = event.target

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const updateEditUser = async () => {
    if (user.role === 'admin') {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/${details._id}`,
        details,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      if (response.status === 200) {
        setEditUser(false)
      }
    }
  }
  return (
    <div className='absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[300px] h-[220px] bg-white p-3 rounded-md custom-shadow'>
      <div className='relative h-[100%]'>
        <i
          onClick={() => setEditUser(false)}
          className='pi pi-times absolute left-[95%] top-[-10%] cursor-pointer'
        />
        <div className=' flex flex-col gap-[12px] mt-5'>
          <div className='flex flex-col gap-[5px]'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={details.name}
              onChange={handleChange}
              className='outline-none border w-full h-[30px] px-2 rounded'
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <label>Role</label>
            <input
              type='text'
              name='role'
              value={details.role}
              onChange={handleChange}
              className='outline-none border w-full h-[30px] px-2 rounded'
            />
          </div>

          <button
            onClick={updateEditUser}
            className='w-full bg-green-500 text-white rounded h-[30px]'
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
