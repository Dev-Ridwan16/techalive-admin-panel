import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { setUser } from "../features/userSlice"

const ProfileCard = ({ closeCard, showCard }) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <div className={`custom-shadow profile-card  ${showCard ? "card" : ""} `}>
        <div className="flex flex-col justify-center items-center relative">
          <i
            className="pi pi-times absolute top-0 left-[95%] translate-x-[-95%]"
            onClick={closeCard}
          />
          <img
            src={user.image}
            alt="Profile image"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="text-center mt-1">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>

          <button
            className="bg-pink text-[#fff] w-full h-[25px] rounded mt-10"
            onClick={() => {
              navigate("/admin-panel/me")
              closeCard()
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProfileCard
