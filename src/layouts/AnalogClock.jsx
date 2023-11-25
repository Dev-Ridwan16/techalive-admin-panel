// src/components/AnalogClock.js
import React, { useState, useEffect } from "react"

const AnalogClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12

  // const secondDegrees = (seconds / 60)
  // const minuteDegrees = ((minutes * 60 + seconds) / 3600)
  // const hourDegrees = ((hours * 3600 + minutes * 60 + seconds) / 43200)

  return (
    <div className="h-full text-white grid place-content-center">
      <div className="text-f25 font-bold font-headFamily w-[200px] flex items-center justify-center">{`${hours} : ${
        minutes < 10 ? `0${minutes}` : minutes
      } : ${seconds < 10 ? `0${seconds}` : seconds}`}</div>
    </div>
  )
}

export default AnalogClock
