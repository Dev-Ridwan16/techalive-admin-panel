import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Notifications } from './Notifications'
import { useNavigate } from 'react-router-dom'

const PasswordReset = ({ match }) => {
  const [passwordReset, setPasswordReset] = useState('')
  const [isToggle, setIsToggle] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const handlePasswordResetValue = (event) => {
    setPasswordReset(event.target.value)
  }

  const handlePasswordVisibity = () => {
    setIsToggle(!isToggle)
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    try {
      const token = match.params.token
      const response = await axios.post(`/api/v1/user/resetPassword/${token}`, {
        password: passwordReset,
      })

      if (response.status === 200) {
        setShowNotification(true)
        setStatus('success')

        setInterval(() => {
          navigate('/login')
        }, 5000)
      }
    } catch (error) {
      if (error) {
        setShowNotification(true)
        setStatus('danger')
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [status])

  return (
    <div className='flex flex-col items-center justify-center h-[50vh] w-[400px]'>
      <div className='float-right'>
        <Notifications
          status={status}
          showNotification={showNotification}
        />
      </div>
      <img
        src='https://i.imgur.com/UKGl5Qk.png'
        alt=''
        className='w-[25px] h-[25px] lg:w-[50px] lg:h-[50px] rounded-full'
      />

      <p className='h-[40px] mt-5'>Enter your new password in the box below</p>

      <div className='relative'>
        <input
          type={isToggle ? 'text' : 'password'}
          value={passwordReset}
          onChange={handlePasswordResetValue}
          className='outline-none border border-grey w-[200px] h-[30px] rounded-md px-2'
        />
        <div
          onClick={handlePasswordVisibity}
          className='absolute top-[50%] translate-y-[-50%] left-[95%] translate-x-[-95%] cursor-pointer'
        >
          {isToggle ? (
            <i className='pi pi-eye-slash' />
          ) : (
            <i className='pi pi-eye' />
          )}
        </div>
      </div>

      <p className='w-[300px] text-f10 text-center mt-5'>
        By clicking the reset password button, you agree that that previous
        password will be updated with one you provided
      </p>

      <button
        onClick={handlePasswordReset}
        className='bg-blue w-[200px] h-[30px] rounded mt-5'
      >
        Reset Password
      </button>
    </div>
  )
}

export default PasswordReset
