import React, { useState } from "react";

const ReviewSite = () => {
  const [review, setReview] = useState({
    name: "",
    category: "",
    service: "",
    companyName: "",
    role: "",
    testimonial: "",
  });

  const [reviewFieldError, setReviewFieldError] = useState({
    name: "",
    category: "",
    service: "",
    companyName: "",
    role: "",
    testimonial: "",
  });

  const [testimonialMaxLength, setTestimonialMaxLength] = useState(150);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "testimonial") {
      const currentLength = value.length;

      const previousLenght = review.testimonial.length;
      const changeInLength = currentLength - previousLenght;

      setTestimonialMaxLength((prevMaxLength) =>
        Math.max(prevMaxLength - changeInLength, 0)
      );
    }

    setReview({ ...review, [name]: value });

    setReviewFieldError({
      ...reviewFieldError,
      [name]:
        value === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required please`
          : "",
    });
  };

  const validateForm = () => {
    const newError = {};

    let isValid = true;
    Object.entries(review).forEach(([fieldName, fieldVale]) => {
      if (fieldVale.trim() === "") {
        newError[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required please`;
        isValid = false;
      }
    });

    setReviewFieldError(newError);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Cool");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-md w-[90%] md:w-[400px] py-5 flex flex-col gap-5">
        <div>
          <div className="flex flex-row items-center justify-center">
            <img
              src="https://i.imgur.com/UKGl5Qk.png"
              alt="Techalive Logo"
              className="w-[50px]"
            />
          </div>
          <h1 className="text-center text-f16 text-pink">
            Kindly give us a review
          </h1>
        </div>

        <form
          action=""
          onSubmit={handleSubmit}
          className="w-[90%] mx-auto flex flex-col gap-3"
        >
          <div>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="border outline-none w-full h-[30px] rounded px-2"
              value={review.name}
              onChange={handleChange}
            />
            <p className="text-[10px] text-[#d33] h-[15px]">
              {reviewFieldError.name}
            </p>
          </div>

          <div>
            <select
              name="service"
              value={review.service}
              className="border outline-none w-full h-[30px] rounded px-2"
              onChange={handleChange}
            >
              <option
                value=""
                disabled
                selected
              >
                Select Service
              </option>
              <option value="Buys">Buys</option>
              <option value="Repairs">Repairs</option>
              <option value="Training">Training</option>
              <option value="Technical Consultant">Technical Consultant</option>
            </select>
            <p className="text-[10px] text-[#d33] h-[15px]">
              {reviewFieldError.service}
            </p>
          </div>

          <div>
            <select
              name="category"
              value={review.category}
              className="border outline-none w-full h-[30px] rounded px-2"
              onChange={handleChange}
            >
              <option
                value=""
                disabled
                selected
              >
                Select Category
              </option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
            <p className="text-[10px] text-[#d33] h-[15px]">
              {reviewFieldError.category}
            </p>
          </div>

          {review.category === "Business" && (
            <div
              className="flex flex-col gap-3
            "
            >
              <div>
                <input
                  type="text"
                  placeholder="Company name"
                  className="border outline-none w-full h-[30px] rounded px-2"
                  value={review.companyName}
                  onChange={handleChange}
                />
                <p className="text-[10px] text-[#d33] h-[15px]">
                  {reviewFieldError.companyName}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Role"
                  className="border outline-none w-full h-[30px] rounded px-2"
                  value={review.role}
                  onChange={handleChange}
                />
                <p className="text-[10px] text-[#d33] h-[15px]">
                  {reviewFieldError.role}
                </p>
              </div>
            </div>
          )}
          <div>
            <textarea
              maxLength={150}
              name="testimonial"
              className="border outline-none w-full min-h-[100px] max-h-[100px] rounded-md px-2"
              placeholder="Testimonial"
              value={review.testimonial}
              onChange={handleChange}
            />
            <div className="flex flex-row justify-between">
              <p className="text-[10px] text-[#d33] h-[15px]">
                {reviewFieldError.testimonial}
              </p>
              <p style={{ fontVariant: "tabular-nums" }}>
                {testimonialMaxLength} / 150
              </p>
            </div>
          </div>

          <button className="bg-blue text-white w-[200px] h-[30px] rounded mx-auto  ">
            Post Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSite;
