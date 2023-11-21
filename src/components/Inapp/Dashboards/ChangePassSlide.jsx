import React, { useState } from "react"

const ChangePassSlide = ({
  passReset,
  iconClick,
  handleInputChange,
  handleToggle,
  fieldError,
}) => {
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 w-[80%] h-[250px]">
        {Object.keys(passReset).map((fieldName, index) => (
          <div
            key={index}
            className="flex flex-col gap-3"
          >
            <label>
              {fieldName === "currentPassword"
                ? "Current password"
                : "Password"}
            </label>
            <div className="relative w-[80%] md:w-[50%]">
              <input
                type={iconClick[fieldName] ? "password" : "text"}
                name={fieldName}
                value={passReset[fieldName]}
                onChange={handleInputChange}
                placeholder="*********"
                className="border w-full md:w-[200px] h-[30px] px-2 rounded outline-none"
              />
              <div className="h-[5px] text-f10 text-red">
                {fieldError[fieldName]}
              </div>
              <div
                className="absolute top-2 left-[95%] translate-x-[-95%]"
                onClick={() => handleToggle(fieldName)}
              >
                {iconClick[fieldName] ? (
                  <i className="pi pi-eye" />
                ) : (
                  <i className="pi pi-eye-slash" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default ChangePassSlide
