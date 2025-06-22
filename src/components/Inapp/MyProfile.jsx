import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../features/userSlice"
import Cookie from "js-cookie"
import axios from "axios"
import { Notifications, Warning } from "../../layouts/Notifications"
import ChangePassSlide from "./Dashboards/ChangePassSlide"

const MyProfile = () => {
  const jwtToken = Cookie.get("jwt")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [userDetails, setUserDetails] = useState({
    image: user.image,
    name: user.name,
    email: user.email,
  })
  const [isloading, setLoading] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [status, setStatus] = useState("")
  const imageRef = useRef()

  /* Changa Password Variables */
  const [passReset, setPassReset] = useState({
    currentPassword: "",
    password: "",
  })
  const [iconClick, setIconClick] = useState({
    currentPassword: true,
    password: true,
  })

  const [fieldError, setFieldError] = useState({
    currentPassword: "",
    password: "",
  })

  /* Changa Password Variables */

  const handleEditProfile = () => setEditProfile(true)

  const handleProfileChange = (event) => {
    const { name, value } = event.target

    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleUploadImage = () => {
    imageRef.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file.type.startsWith("image/")) {
      const previewURL = URL.createObjectURL(file)

      setPreviewImage(previewURL)

      setEditProfile(true)

      setUserDetails({ ...userDetails, image: previewURL })
    } else setPreviewImage(null)
  }

  const handleUpadateProfile = async (event) => {
    setLoading(true)
    const formData = new FormData()

    if (imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0])
    }

    formData.append("name", userDetails.name)
    formData.append("email", userDetails.email)

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/updateMe`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      switch (response.status) {
        case 200:
          Cookie.remove("jwt")
          dispatch(setUser(response.data.user))
          setShowNotification(true)
          setStatus("success")
          setTimeout(() => setStatus("warning"), 5000)
          setTimeout(() => navigate("/login"), 10000)
          setLoading(false)
          break
        default:
      }
    } catch (error) {
      console.log(error)

      if (error.response && error.response.status === 401) {
        setShowNotification(true)
        setStatus("warning")
        setInterval(() => navigate("/login"), 5000)
        setLoading(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => setShowNotification(false), 5000)

    return () => clearInterval(interval)
  }, [status])

  /* Change Password Env Start */
  const handleToggle = (fieldName) => {
    setIconClick((prevIconClick) => ({
      ...prevIconClick,
      [fieldName]: !prevIconClick[fieldName],
    }))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setPassReset({ ...passReset, [name]: value })
  }

  let disable = false

  const validateInput = () => {
    let isValid = true

    Object.entries(passReset).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === "") {
        disable = true
        isValid = false
      }
    })

    return isValid
  }

  validateInput()

  const handleUpdatePassword = async () => {
    setFieldError({
      currentPassword: "",
      password: "",
    })
    setShowNotification(true)

    setLoading(true)

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/updateMyPassword`,
        passReset,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      switch (response.status) {
        case 200:
          setStatus("success")

          setLoading(false)

          setInterval(() => {
            navigate("/login")
          }, 5000)
          break

        default:
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setStatus("warning")

        setLoading(false)

        setInterval(() => {
          navigate("/login")
        }, 5000)
      } else if (error.response && error.response.status === 403) {
        setLoading(false)

        setFieldError({
          ...fieldError,
          currentPassword: "Incorrect Password!",
        })
        return
      } else if (error.response && error.response.status === 400) {
        setLoading(false)

        setFieldError({
          ...fieldError,
          password: "You cannot use previous password!",
        })
        return
      }
    }
  }
  /* Change Password Env End */

  return (
    <div>
      <button>Go back to Overview</button>

      {/* {showNotification && ( */}
      <Notifications
        status={status}
        showNotification={showNotification}
      />
      {/* )} */}

      <div className="w-[100%] md:h-[400px] lg:max-w-[80%] mx-auto mt-10 flex flex-col gap-5">
        <h2 className=" text-f16">Profile</h2>
        <div className="custom-shadow bg-[#fff] w-[100%] h-[100%] pl-10 flex flex-col md:flex-row gap-10 md:items-center justify-center">
          <div className="flex flex-col items-center justify-center w-[80%] md:w-[50%] gap-5">
            <img
              src={
                previewImage && typeof previewImage === "string"
                  ? previewImage
                  : userDetails.image
              }
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-md"
            />
            <button
              onClick={handleUploadImage}
              className="border border-dashed w-full h-[30px] flex items-center justify-center"
            >
              Upload Image
            </button>
            <input
              type="file"
              name="image"
              ref={imageRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className=" flex flex-col w-[80%] gap-5">
            {changePassword ? (
              <ChangePassSlide
                passReset={passReset}
                iconClick={iconClick}
                handleInputChange={handleInputChange}
                handleToggle={handleToggle}
                fieldError={fieldError}
              />
            ) : (
              <div className="h-[250px]">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    disabled={editProfile ? false : true}
                    value={userDetails.name}
                    onChange={handleProfileChange}
                    className="border w-full md:w-[200px] h-[30px] px-2 rounded outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    id=""
                    value={userDetails.email}
                    onChange={handleProfileChange}
                    disabled={editProfile ? false : true}
                    className="border w-full md:w-[200px] h-[30px] px-2 rounded outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Role</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={user.role}
                    disabled
                    className="border w-full md:w-[200px] h-[30px] px-2 rounded flex items-center"
                  />
                </div>
              </div>
            )}

            {changePassword ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setChangePassword(false)}
                  className="border border-[#999] text-[#999] w-[100px] h-[30px] flex gap-3 items-center justify-center"
                >
                  Back
                </button>
                <button
                  onClick={handleUpdatePassword}
                  disabled={disable}
                  className={`border border-indigo-500 text-indigo-500 
                  w-[150px] h-[30px] flex gap-3 items-center justify-center
                  ${disable && " opacity-50"}
                  `}
                >
                  {isloading ? (
                    "Updating password..."
                  ) : (
                    <span>
                      "Update Password"
                      <i className="pi pi-send" />
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                {editProfile ? (
                  <button
                    onClick={handleUpadateProfile}
                    className="border border-green-500 text-green-500 w-[100px] h-[30px] flex gap-3 items-center justify-center"
                  >
                    {isloading ? (
                      <span>
                        Please wait <i className="pi pi-spin pi-spinner" />
                      </span>
                    ) : (
                      "Save"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleEditProfile}
                    className="border border-green-500 text-green-500 w-[100px] h-[30px] flex gap-3 items-center justify-center"
                  >
                    Edit Profile
                  </button>
                )}

                <button
                  onClick={() => setChangePassword(true)}
                  className="border border-indigo-500 text-indigo-500 w-[150px] h-[30px] flex gap-3 items-center justify-center"
                >
                  Change Password <i className="pi pi-key" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
