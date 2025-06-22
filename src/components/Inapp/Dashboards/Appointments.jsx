import axios from "axios"
import React, { useEffect, useState } from "react"
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom"

function formatDate(dateString) {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }

  return new Date(dateString).toLocaleDateString("en-Us", dateOptions)
}

function formatTime(time24Hour) {
  const [hour, minute] = time24Hour.split(":")

  const hr = parseInt(hour, 10)

  const unit = hr >= 12 ? "PM" : "AM"

  const twelveHour = hr % 12 || 12

  return `${twelveHour} : ${minute} (${unit})`
}

export const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [readMessage, setReadMessage] = useState(-1)
  const [isCheck, setIsCheck] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  const window_size = window.innerWidth <= 820

  const jwtToken = Cookie.get("jwt")

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/appointment/all-appointment`,

          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        const data = response.data

        const checkedStatus = data.appointments.map(
          (appointment) => appointment.checked || false
        )

        // setIsCheck(new Array(data.appointments.length).fill(false));
        setIsCheck(checkedStatus)

        setAppointments(data.appointments)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login")
        }
      }
    })()
  }, [])

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/appointment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const calculatePendingAppointmentDelay = (appointment) => {
    const scheduleTime = new Date(`${appointment.date} ${appointment.time}`)

    const currentTime = new Date()

    const timeDifference = scheduleTime - currentTime

    return timeDifference
  }

  const scheduleAppointmentDeletion = (appointment, index) => {
    const delay = isCheck[index]
      ? // ? import.meta.env.REACT_APP_MARKED_APPOINTMENT_DELETE_TIME * 60 * 1000
        Date.now() + 30 * 60 * 1000
      : calculatePendingAppointmentDelay(appointment)

    const timeout = setTimeout(() => {
      deleteAppointment(appointment._id)
    }, delay)

    return () => clearTimeout(timeout)
  }

  const handleCheck = async (index, appointment) => {
    const newCheck = [...isCheck]

    newCheck[index] = !newCheck[index]

    setIsCheck(newCheck)

    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/appointment/${appointment._id}`,
        {
          checked: newCheck[index],
        },

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }

    if (newCheck[index]) scheduleAppointmentDeletion(appointment, index)
  }

  const noOfPending = isCheck.filter((checked) => !checked).length
  const noOfMarked = isCheck.filter((checked) => checked).length

  return (
    <div>
      <h1 className="board-header"> Appointments</h1>
      <AppointmentAnalytics
        appointments={appointments.length}
        noOfPending={noOfPending}
        noOfMarked={noOfMarked}
      />
      <div className="marquee">
        <marquee
          behavior=""
          direction=""
        >
          Marked appointments will be deleted after 30 minutes, and pending
          appointments will be canceled after the scheduled time.
        </marquee>
      </div>
      <div className="appointment-container">
        <input
          type="search"
          id="search"
          placeholder="Search by name or email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <table className="appointment-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              {window_size ? "" : <th>Phone No.</th>}
              <th>Purpose</th>
              <th>{window_size ? "Booked On".split(" ")[0] : "Booked On"}</th>
              <th>
                {window_size ? "Date Booked".split(" ")[0] : "Date Booked"}
              </th>
              <th>
                {window_size ? "Time Booked".split(" ")[0] : "Time Booked"}
              </th>
              {window_size ? "" : <th>Message</th>}
              {window_size ? "" : <th>Status</th>}
            </tr>
          </thead>

          <tbody>
            {appointments
              .filter((filter) =>
                searchValue.trim() === ""
                  ? filter
                  : filter.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    filter.email
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
              .map((appointment, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isCheck[index]}
                      onChange={() => handleCheck(index, appointment)}
                    />
                  </td>
                  <td>{appointment.name}</td>
                  <td>
                    {appointment.email.length > 8
                      ? appointment.email.slice(0, 8) + "..."
                      : appointment.email}
                  </td>
                  {window_size ? "" : <td>{appointment.phone}</td>}

                  <td>
                    {appointment.purpose.length > 10
                      ? appointment.purpose.slice(0, 10) + "..."
                      : appointment.purpose}
                  </td>
                  <td>{formatDate(appointment.bookedOn)}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{formatTime(appointment.time)}</td>
                  {window_size ? (
                    ""
                  ) : (
                    <td>
                      <span
                        onMouseEnter={() => setReadMessage(index)}
                        onMouseLeave={() => setReadMessage(-1)}
                      >
                        {window_size
                          ? "..."
                          : appointment.message.length > 20
                          ? appointment.message.slice(0, 20) + "..."
                          : appointment.message}
                      </span>

                      {readMessage === index && (
                        <div className="read-message">
                          {appointment.message}
                        </div>
                      )}
                    </td>
                  )}
                  {window_size ? (
                    ""
                  ) : (
                    <td>
                      <div
                        className={` ${isCheck[index] ? "marked" : "pending"}`}
                      >
                        {isCheck[index] ? "Marked" : "Pending"}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const AppointmentAnalytics = ({
  appointments,
  noOfPending,
  noOfMarked,
}) => {
  return (
    <div className="appoint-analytics-container">
      <div className="analysis-wrapper">
        <h3>Appointements for Today</h3>
        <h1>{appointments}</h1>
      </div>
      <div className="analysis-wrapper">
        <h3>Pending for today</h3>
        <h1>{noOfPending}</h1>
      </div>
      <div className="analysis-wrapper">
        <h3>Attended for today</h3>
        <h1>{noOfMarked}</h1>
      </div>
    </div>
  )
}
