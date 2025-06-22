import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { roles } from '../../../../default-api'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { RequestReview } from './RequestReview'

export const Reviews = () => {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const jwtToken = Cookies.get('jwt')

  useEffect(() => {
    const getAllReviews = async () => {
      const response = await axios.get(
        'process.env.SERVER_URL/api/v1/review/get-review',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      const data = response.data
      setReviews(data.review)
    }

    getAllReviews()
  }, [reviews])

  const handleDeleteReview = async (review) => {
    await axios.delete(
      `process.env.SERVER_URL/api/v1/review/${review._id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
  }
  return (
    <div className='h-[510px] overflow-y-scroll'>
      <header className='max-w-[95%] mx-auto h-[70px] flex items-center'>
        <div className='flex justify-between w-full'>
          {window.location.pathname.includes('new-testimonial') ? (
            <button
              onClick={() => navigate(-1)}
              className=' bg-gray-100 h-[35px] w-[100px] rounded-md'
            >
              <i className='pi pi-arrow-left pr-3' />
              Go back
            </button>
          ) : (
            <Link to='new-testimonial'>
              <button className=' bg-gray-100 h-[35px] w-[180px] rounded-md'>
                Request a Testimonal +
              </button>
            </Link>
          )}
          {!window.location.pathname.includes('new-testimonial') && (
            <h4>No of Testimonials: {reviews.length}</h4>
          )}
        </div>
      </header>

      {window.location.pathname.includes('new-testimonial') ? (
        <RequestReview />
      ) : (
        <main>
          <div className='grid grid-cols-3 gap-3'>
            {reviews.map((review, index) => (
              <div
                key={index}
                className='border p-3 rounded relative'
              >
                <i
                  className='pi pi-trash absolute top-5 left-[95%] translate-x-[-95%] text-red cursor-pointer'
                  onClick={() => handleDeleteReview(review)}
                />
                <div className='flex gap-5 items-center'>
                  <div className='w-[50px] h-[50px] rounded-full bg-slate-300 grid place-items-center'>
                    <h1>{review.name.charAt(0).toUpperCase()}</h1>
                  </div>
                  <div className='flex flex-col'>
                    <h2>{review.name}</h2>
                    <p>
                      {roles.some(
                        (role) =>
                          role.full === review.role ||
                          role.short === review.role
                      )
                        ? review.role + ' @ ' + review.company
                        : review.role === 'Founder' || 'co-founder'
                        ? review.role + ' of ' + review.company
                        : review.company}
                    </p>
                  </div>
                </div>

                <div className='mt-5'>
                  <p className='leading-[25px]'>{review.testimonial}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  )
}
