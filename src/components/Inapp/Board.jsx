import React, { useState, useEffect, useRef } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { overview_total } from '../../../default-api'

import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../features/loadingSlice'
import { setUser } from '../../features/userSlice'

import axios from 'axios'
import Cookie from 'js-cookie'

import { Notifications } from '../../layouts/Notifications'
import { DeleteConfirmation } from '../../layouts/DeleteConfirmation'
import EditingModal from '../../layouts/EditingModal'
import { Products } from './Dashboards/Products'
import { AddProduct } from './Dashboards/AddProduct'
import { Blogs } from './Dashboards/Blogs'
import { Appointments } from './Dashboards/Appointments'
import { Reviews } from './Dashboards/Reviews'
import Settings from './Dashboards/Settings'
import NewPost from './Dashboards/NewPost'
import MyProfile from './MyProfile'
import AnalogClock from '../../layouts/AnalogClock'
import { RequestReview } from './Dashboards/RequestReview'
import { EditUser } from '../../layouts/EditUser'

export const Board = () => {
  return (
    <div className='w-[95%] mx-auto my-5'>
      <Routes>
        <Route
          path='overview'
          element={<Overview />}
        />
        <Route
          path='products'
          element={<Products />}
        >
          <Route
            path='add-new-product'
            element={<AddProduct />}
          />
        </Route>
        <Route
          path='blogs'
          element={<Blogs />}
        >
          <Route
            path='new-blog-post'
            element={<NewPost />}
          />
        </Route>
        <Route
          path='appointments'
          element={<Appointments />}
        />
        <Route
          path='reviews'
          element={<Reviews />}
        >
          <Route
            path='new-testimonial'
            element={<RequestReview />}
          />
        </Route>
        <Route
          path='settings'
          element={<Settings />}
        />
        <Route
          path='me'
          element={<MyProfile />}
        />
      </Routes>
    </div>
  )
}

export const Overview = () => {
  const [allProducts, setAllProducts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allBlogs, setAllBlogs] = useState([])

  const [showNotifcation, setShowNotification] = useState(false)
  const [editUser, setEditUser] = useState(false)
  const [editUserDetails, setEditUserDetails] = useState(null)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const jwtToken = Cookie.get('jwt')

  const user = useSelector((state) => state.user)
  let disable

  if (user.role === 'admin') {
    disable = false
  } else {
    disable = true
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          'https://techalive.onrender.com/api/v1/product/all-products',
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        const data = response.data

        setAllProducts(data.products)
      } catch (error) {
        console.log(error)
      }
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(
          'https://techalive.onrender.com/api/v1/user/get-users',
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        const data = response.data
        setAllUsers(data.getAllUsers)
      } catch (error) {
        console.log(error)
      }
    }

    const getAllBlogs = async () => {
      setShowNotification(true)
      try {
        const response = await axios.get(
          'https://techalive.onrender.com/api/v1/blog-post/all-blogs',
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        const data = response.data

        setAllBlogs(data.allBlogs)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus('warning')
          navigate('/login')
        }

        console.log(error)

        !isOnline ? setStatus('offline') : null
      }
    }

    getProducts()
    getUsers()
    getAllBlogs()

    const interval = setInterval(() => {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [status])

  const handleEditUser = (user) => {
    setEditUser(true)
    setEditUserDetails(user)
  }

  const handleDeleteUser = async (user) => {
    await axios.delete(
      `https://techalive.onrender.com/api/v1/user/${user._id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )

    console.log(user.name)
  }
  return (
    <div>
      {showNotifcation && (
        <Notifications
          status={status}
          showNotification={showNotifcation}
        />
      )}
      {editUser && (
        <EditUser
          editUserDetails={editUserDetails}
          setEditUser={setEditUser}
        />
      )}
      <h1 className='board-header'>Overview</h1>
      <div className='dashboard-container'>
        <div className='dashboard-wrapper'>
          <h4 className='font-bodyFamily'>Products</h4>
          <div className='dashboard-content'>
            <i className='pi pi-chart-pie dashboard-icon'></i>
            <h2 className='flex items-center justify-center h-full text-f25 '>
              {allProducts.length}
            </h2>
          </div>
        </div>
        <div className='dashboard-wrapper'>
          <h4 className='font-bodyFamily'>Workers</h4>
          <div className='dashboard-content'>
            <i className='pi pi-users dashboard-icon'></i>
            <h2 className='flex items-center justify-center h-full text-f25 '>
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className='dashboard-wrapper'>
          <h4 className='font-bodyFamily'>Blogs</h4>
          <div className='dashboard-content'>
            <i className='pi pi-chart-bar dashboard-icon'></i>
            <h2 className='flex items-center justify-center h-full text-f25 '>
              {allBlogs.length}
            </h2>
          </div>
        </div>
        <div className='dashboard-wrapper'>
          <h4 className='font-bodyFamily'>Reviews</h4>
          <div className='dashboard-content'>
            <i className='pi pi-eye dashboard-icon'></i>
            <h2 className='flex items-center justify-center h-full text-f25 '>
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className='dashboard-wrapper'>
          <h4 className='font-bodyFamily'>Appointments</h4>
          <div className='dashboard-content'>
            <i className='pi pi-inbox dashboard-icon'></i>
            <h2 className='flex items-center justify-center h-full text-f25 '>
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className='dashboard-wrapper'>
          <AnalogClock />
        </div>
      </div>

      <table className='w-full flex flex-col mt-10 gap-5'>
        <thead className='w-full'>
          <tr className='grid grid-cols-6 place-items-start'>
            <th className=''>Image</th>
            <th className=''>Name</th>
            <th className=''>Email</th>
            <th className=''>Phone Number</th>
            <th className=''>Role</th>
            <th className=''>Action</th>
          </tr>
        </thead>

        <tbody className='w-full'>
          {allUsers.map((user, index) => (
            <tr
              key={index}
              className='grid grid-cols-6 place-items-start mb-5'
            >
              <td className='text-start flex items-center gap-3 '>
                <img
                  src={user.image}
                  alt=''
                  className='w-[40px] h-[40px] rounded-full'
                />
              </td>
              <td className='text-start'>{user.name}</td>
              <td className='text-start'>{user.email}</td>
              <td className='text-start'>+234 704 7344 365</td>
              <td className='text-start'>{user.role}</td>
              {user.role === 'admin' ? null : (
                <td className='text-start w-[100px] flex gap-3'>
                  <button disabled={disable}>
                    <i
                      onClick={() => handleEditUser(user)}
                      className={`pi pi-pencil text-green-500 ${
                        disable ? 'opacity-20' : ''
                      }`}
                    />
                  </button>
                  <button disabled={disable}>
                    <i
                      onClick={() => handleDeleteUser(user)}
                      className={`pi pi-trash text-rose-500 ${
                        disable ? 'opacity-20' : ''
                      }`}
                    />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
