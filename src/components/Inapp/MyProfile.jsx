import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../features/userSlice"
import Cookie from "js-cookie"
import axios from "axios"
import { Notifications, Warning } from "../../layouts/Notifications"

const MyProfile = () => {
  const jwtToken = Cookie.get("jwt")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isloading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    image: user.image,
    name: user.name,
    email: user.email,
  })
  const [editProfile, setEditProfile] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [status, setStatus] = useState("")
  const imageRef = useRef()

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
        `https://techalive.onrender.com/api/v1/user/${user._id}`,
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
          Cookie.set("jwt", "")
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

      if (error.response && error.response.status === 404) {
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

              <button className="border border-indigo-500 text-indigo-500 w-[150px] h-[30px] flex gap-3 items-center justify-center">
                Change Password <i className="pi pi-key" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
