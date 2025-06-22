import React, { useEffect, useState } from 'react'
import { Link, Route, Router, Routes, useNavigate } from 'react-router-dom'
import { Notifications } from '../layouts/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError } from '../features/loadingSlice'
import { setUser, clearUser } from '../features/userSlice'

import axios from 'axios'
import Cookies from 'js-cookie'
import Welcome_Illus from '../../public/welcome.svg'

// Style
import '../Style/Account.css'

export const AccountForm = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<WelcomPage />}
        ></Route>
      </Routes>
    </div>
  )
}

export const WelcomPage = () => {
  const navigate = useNavigate()

  return (
    <div className='w-screen h-screen bg-blue text-[#fff]'>
      <div className='flex flex-row h-full items-center justify-between w-[85%] mx-auto'>
        <div className='w-[42.5%] '>
          <h1 className='text-white text-f35 mb-5'>Welcome Admin!</h1>
          <p className='mb-5'>Techalive admin platform</p>
          <div className='flex flex-row gap-3 mt-10'>
            <button
              className='w-[150px] h-[40px] bg-pink rounded-md'
              onClick={() => navigate('signup')}
            >
              Create Account
            </button>
            <button
              className='w-[150px] h-[40px] border border-pink text-pink rounded-md'
              onClick={() => navigate('login')}
            >
              Log in
            </button>
          </div>
        </div>
        <div className='w-[42.5%] '>
          <img
            src={Welcome_Illus}
            alt=''
            className='w-[600px] h-[500px]'
          />
        </div>
      </div>
    </div>
  )
}

export const SignupComp = ({ isToggle, handleIsToggle }) => {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [status, setStatus] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showNotification, setShowNotification] = useState(false)

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.loading)

  // Handling user input change
  const handleUserDetailsChange = (event) => {
    const { name, value } = event.target

    setUserDetails({ ...userDetails, [name]: value })

    setFieldErrors({
      ...fieldErrors,
      [name]:
        value === ''
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : '',
    })
  }

  // Check for connection
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(true)
    }

    const handleOfflineStatusChange = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOfflineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOfflineStatusChange)
    }
  })

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.entries(userDetails).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === '') {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required.`
        isValid = false
      }
    })

    setFieldErrors(newErrors)
    return isValid
  }

  // Submiting user datas
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      dispatch(setLoading(true))

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/signup`,
          userDetails
        )
        switch (response.status) {
          case 201:
            dispatch(setUser(response.data.user))
            setShowNotification(true)
            setStatus('success')
            dispatch(setLoading(false))
            setTimeout(() => {
              navigate('/admin-panel/overview')
            }, 5000)
            break
          case 500:
            setShowNotification(true)
            setStatus('danger')
            break
          default:
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setStatus('warning')
          setShowNotification(true)
          dispatch(setLoading(false))
          dispatch(setError(true))
        } else {
          setStatus('danger')
          !isOnline ? setStatus('offline') : null

          setShowNotification(true)
          dispatch(setLoading(false))
          dispatch(setError(true))
        }
        console.log(err)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  useEffect(() => {
    const interver = setInterval(() => {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interver)
  }, [status])

  return (
    <div className='acc-container'>
      <Notifications
        status={status}
        showNotification={showNotification}
      />
      <div className='brand'>
        <img
          src='https://i.imgur.com/UKGl5Qk.png'
          alt=''
        />
        <h1>Techalive</h1>
      </div>
      <div className='form'>
        <h1>Create account</h1>
        <p>Signup as an admin</p>
        <form
          action=''
          onSubmit={handleSubmit}
        >
          {Object.keys(userDetails).map((fieldName) => (
            <div
              key={fieldName}
              className={fieldName === 'password' ? 'password' : ''}
            >
              <input
                type={
                  fieldName === 'password' && isToggle
                    ? 'password'
                    : fieldName === 'password'
                    ? 'paswword'
                    : fieldName === 'email'
                    ? 'email'
                    : 'text'
                }
                placeholder={
                  fieldName === 'password'
                    ? 'Create ' +
                      fieldName.charAt(0).toUpperCase() +
                      fieldName.slice(1)
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                }
                name={fieldName}
                value={userDetails[fieldName]}
                onChange={handleUserDetailsChange}
              />
              {fieldName === 'password' && (
                <div
                  className='showToggle'
                  onClick={handleIsToggle}
                >
                  {isToggle ? (
                    <i className='pi pi-eye'></i>
                  ) : (
                    <i className='pi pi-eye-slash'></i>
                  )}
                </div>
              )}
              <div className='text-f10 text-red mt-[0.5px]'>
                {fieldErrors[fieldName] && (
                  <div className='error'>{fieldErrors[fieldName]}</div>
                )}
              </div>
            </div>
          ))}

          <button
            type='submit'
            disabled={isLoading ? true : false}
          >
            <span>{` ${!isLoading ? 'Create account' : 'Please wait'}`}</span>
            {isLoading && <i className='pi pi-spin pi-spinner text-f12 ml-3' />}
          </button>
        </form>
        <div className='foot'>
          <div>
            <Link to={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LoginComp = ({ isToggle, handleIsToggle }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  })
  const [status, setStatus] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showNotification, setShowNotification] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.loading)

  const handleLoginDetailsChange = function (event) {
    const { name, value } = event.target

    setLoginDetails({ ...loginDetails, [name]: value })

    setFieldErrors({
      ...fieldErrors,
      [name]:
        value === ''
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : '',
    })
  }

  // Check connection
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(true)
    }

    const handleOfflineStatusChange = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOfflineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOfflineStatusChange)
    }
  })

  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    Object.entries(loginDetails).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === '') {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required.`
        isValid = false
      }
    })

    setFieldErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      dispatch(setLoading(true))
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`,
          loginDetails
        )

        switch (response.status) {
          case 200:
            const jwtToken = response.data.token

            Cookies.set('jwt', jwtToken)

            // console.log(jwtToken);
            console.log(response)
            dispatch(setUser(response.data.user))

            console.log(response.data.user)
            setShowNotification(true)
            setStatus('success')
            dispatch(setLoading(false))
            setTimeout(() => {
              navigate('/admin-panel/overview')
            }, 5000)
            break
          case 500:
            setShowNotification(true)
            setStatus('danger')
            break
          default:
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setStatus('warning')
          setShowNotification(true)
          dispatch(setLoading(false))
          dispatch(setError(true))
        } else {
          setStatus('danger')
          !isOnline ? setStatus('offline') : null

          setShowNotification(true)
          dispatch(setLoading(false))
          dispatch(setError(true))
        }
        console.log(err)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/forgotPassword`,
        { email: loginDetails.email }
      )

      switch (response.status) {
        case 200:
          alert('Password reset token has been sent to your email!')
          break
        default:
      }
    } catch (error) {
      alert(
        'Error:',
        error.response ? error.response.data.message : 'Unknown error'
      )
    }
  }

  useEffect(() => {
    const interver = setInterval(() => {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interver)
  }, [status])

  return (
    <div className='acc-container'>
      <Notifications
        status={status}
        showNotification={showNotification}
      />
      <div className='brand'>
        <img
          src='https://i.imgur.com/UKGl5Qk.png'
          alt=''
        />
        <h1>Techalive</h1>
      </div>
      <div className='form'>
        <h1>Login your account</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(loginDetails).map((fieldName) => (
            <div
              key={fieldName}
              className={fieldName === 'password' ? 'password' : ''}
            >
              <input
                type={
                  fieldName === 'password' && isToggle
                    ? 'password'
                    : fieldName === 'password'
                    ? 'paswword'
                    : fieldName === 'email'
                    ? 'email'
                    : 'text'
                }
                placeholder={`${fieldName === 'password' ? 'Your' : ''} ${
                  fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                } ${fieldName === 'email' ? 'address' : ''} `}
                name={fieldName}
                value={loginDetails[fieldName]}
                onChange={handleLoginDetailsChange}
              />
              {fieldName === 'password' && (
                <div
                  className='showToggle'
                  onClick={handleIsToggle}
                >
                  {isToggle ? (
                    <i className='pi pi-eye'></i>
                  ) : (
                    <i className='pi pi-eye-slash'></i>
                  )}
                </div>
              )}
              <div className='text-f10 text-red mt-[0.5px]'>
                {fieldErrors[fieldName] && (
                  <div className='error'>{fieldErrors[fieldName]}</div>
                )}
              </div>
            </div>
          ))}
          <button
            type='submit'
            disabled={isLoading ? true : false}
          >
            <span>{` ${!isLoading ? 'Login' : 'Please wait'}`}</span>
            {isLoading && <i className='pi pi-spin pi-spinner text-f12 ml-3' />}
          </button>
        </form>
        <div className='foot'>
          <div>
            <Link to={'/signup'}>Signup</Link>
          </div>
          <p onClick={handleForgotPassword}>Forgot password</p>
        </div>
      </div>
    </div>
  )
}
