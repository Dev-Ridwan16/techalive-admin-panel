import React, { useState } from "react"
import { useSelector } from "react-redux"
import { setUser } from "../../features/userSlice"

const MyProfile = () => {
  const user = useSelector((state) => state.user)
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
  })
  return (
    <div>
      <button>Go back to Overview</button>

      <div className="w-[100%] h-[400px] max-w-[75%] mx-auto flex flex-col gap-5">
        <h2 className=" text-f16">Profile</h2>
        <div className="custom-shadow bg-[#fff] w-[100%] h-[100%] flex flex-row gap-10 items-center justify-center">
          <div className="flex flex-col gap-5">
            <img
              src={user.image}
              className="w-[250px] h-[250px]"
            />
            <label htmlFor="">
              <div className="border border-dashed h-[30px] flex items-center justify-center">
                Upload Image
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-5">
            <div className="h-[250px]">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={userDetails.name}
                  className="border w-[200px] h-[30px] px-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name=""
                  id=""
                  value={userDetails.email}
                  className="border w-[200px] h-[30px] px-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">Role</label>
                <p
                  type="text"
                  name=""
                  id=""
                  className="border w-[200px] h-[30px] px-2 rounded flex items-center"
                >
                  {user.role}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="border border-green-500 text-green-500 w-[100px] h-[30px] flex gap-3 items-center justify-center">
                Edit Profile <i className="pi pi-pencil" />
              </button>
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
