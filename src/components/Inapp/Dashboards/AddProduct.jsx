import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Notifications } from '../../../layouts/Notifications'
import AddImage from '../../../assets/add-image.png'
import axios from 'axios'
import Cookie from 'js-cookie'

export const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  })

  const [status, setStatus] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [filePreview, setFilePreview] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setProductDetails({ ...productDetails, [name]: value })
    setFieldErrors({
      ...fieldErrors,
      [name]:
        value === ''
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : '',
    })
  }

  const handleFileSelect = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      setSelectedFileName(selectedFile.name)

      if (selectedFile.type.startsWith('image/')) {
        const previewURL = URL.createObjectURL(selectedFile)
        setFilePreview(previewURL)
      } else {
        setFilePreview(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setFilePreview(null)
    setSelectedFileName('')
    fileInputRef.current.value = ''
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

  const validateForm = function () {
    const newErrors = {}

    let isValid = true

    Object.entries(productDetails).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === '') {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`
        isValid = false
      }
    })

    setFieldErrors(newErrors)
    return isValid
  }

  const jwtToken = Cookie.get('jwt')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)

      const formData = new FormData()

      // Append the image file to the FormData
      if (fileInputRef.current.files[0]) {
        formData.append('image', fileInputRef.current.files[0])
      }

      // Append other product details to the FormData
      formData.append('name', productDetails.name)
      formData.append('price', productDetails.price)
      formData.append('category', productDetails.category)
      formData.append('description', productDetails.description)
      try {
        const response = await axios.post(
          'https://techalive.onrender.com/api/v1/product/add-product',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        switch (response.status) {
          case 201:
            setShowNotification(true)
            setStatus('success')
            setIsLoading(false)
            setProductDetails({
              name: '',
              price: '',
              category: '',
              description: '',
            })
            setFilePreview(null)
            setSelectedFileName('')
            fileInputRef.current.value = ''
            break

          default:
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus('warning')
          setShowNotification(true)
          setIsLoading(false)
          navigate
        } else if (error.response && error.response.status === 403) {
          setStatus('info')
          setShowNotification(true)
          console.log('forbid')
          setIsLoading(false)
        }
        !isOnline ? setStatus('offline') : null
        setShowNotification(true)
        setIsLoading(false)
      }
    } else {
      setIsLoading(isLoading)
    }
  }

  useEffect(() => {
    const interval = setInterval(function () {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [status])
  return (
    <div className=''>
      {isLoading && (
        <div className=' absolute top-0 left-0 w-screen h-screen'></div>
      )}
      <div className='float-right'>
        <Notifications
          status={status}
          showNotification={showNotification}
        />
      </div>
      <div className='adding-product'>
        <div className='flex items-center justify-between'>
          <h3 className='text-grey text-f16 font-bodyFamily'>
            Add New Product
          </h3>
          <button
            type='submit'
            className=' bg-green-700 text-[#fff] w-[150px] h-[40px] rounded-md '
            onClick={handleSubmit}
          >
            {`${!!isLoading ? 'Adding' : 'Add Product'}`}
            {isLoading && (
              <i className='pi pi-spin pi-spinner text-f12 ml-3'></i>
            )}
          </button>
        </div>
        {/* Details and Preview */}
        <div className='flex flex-col lg:flex-row justify-between mt-5'>
          <div className='product-infomation '>
            <div className='product-information-wrapper'>
              <div className='flex flex-col gap-3'>
                <label htmlFor=''>Image</label>
                <div className='flex flex-row items-center gap-2'>
                  <div
                    className='border flex flex-row items-center justify-center rounded-md p-3 w-[80px] h-[80px] cursor-pointer'
                    onClick={handleFileSelect}
                  >
                    <img
                      src={AddImage}
                      alt=''
                      className='custom-image'
                    />
                    <input
                      name='image'
                      type='file'
                      accept='image/*'
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {selectedFileName && (
                      <div className='flex items-center gap-3'>
                        <p className=' bg-gray-300 p-1 rounded'>
                          {selectedFileName}
                        </p>
                        <i
                          className='pi pi-times text-f10 text-red'
                          onClick={handleRemoveFile}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='text-details'>
                <div className='mt-3'>
                  <label className='text-f14'>Product Informations</label>
                  <form className='mt-5'>
                    {Object.keys(productDetails).map((fieldName, i) => (
                      <div key={i}>
                        {fieldName === 'name' || fieldName === 'price' ? (
                          <input
                            name={fieldName}
                            type={fieldName === 'price' ? 'number' : 'text'}
                            value={productDetails[fieldName]}
                            placeholder={`Product ${
                              fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)
                            }`}
                            onChange={handleChange}
                          />
                        ) : fieldName == 'description' ? (
                          <textarea
                            name={fieldName}
                            value={productDetails[fieldName]}
                            placeholder={`Product ${
                              fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)
                            }`}
                            onChange={handleChange}
                            className='max-h-[150px] min-h-[150px] h-[150px] w-[400px] max-w-[400px] outline-none border rounded-md px-3 py-2'
                          ></textarea>
                        ) : (
                          <select
                            name={fieldName}
                            value={productDetails[fieldName]}
                            onChange={handleChange}
                            className='border w-[400px] h-[30px] px-3 rounded-md'
                          >
                            <option
                              value=''
                              disabled
                              selected
                            >
                              Select category
                            </option>
                            <option value='Accessories'>Accessories</option>
                            <option value='Computer'>Computer</option>
                            <option value='Electronic'>Electronic</option>
                            <option value='Gadgets'>Gadgets</option>
                            <option value='Smartphones'>Smartphones</option>
                          </select>
                        )}

                        <div className='text-f10 text-red mt-[0.5px] mb-[10px]'>
                          {fieldErrors[fieldName] && (
                            <div className='error'>{`Product ${fieldErrors[fieldName]}`}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='preview'>
            <div className='max-w-[85%] md:max-w-[75%] mx-auto mt-4'>
              <div className='preview-container'>
                {filePreview && typeof filePreview === 'string' && (
                  <img
                    src={filePreview}
                    alt=''
                  />
                )}
              </div>
              <div className='preview-details'>
                <h3 className=' font-bodyFamily text-f16 text-grey mt-2 font-wm h-[10px]'>
                  {productDetails.category}
                </h3>
                <h2 className='text-f16 mt-5 h-[10px]'>
                  {productDetails.name}
                </h2>
                <h3 className='text-pink text-f16 mt-5 h-[10px]'>
                  {`${
                    productDetails.price === ''
                      ? ''
                      : '₦' + productDetails.price
                  }`}
                </h3>
                <div
                  className='mt-5 w-[400px] min-h-[150px] max-h-[150px] h-[150px] overflow-y-scroll  rounded-md'
                  style={{ wordWrap: 'break-word' }}
                >
                  {productDetails.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
