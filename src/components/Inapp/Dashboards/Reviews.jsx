import React, { useState } from "react";

export const Reviews = () => {
  const [whatsappMessanger, setWhatsappMessanger] = useState({
    PHONE_NUMBER: "",
    WHATSAPP_MESSAGE: "",
  });

  const [fieldError, setFieldError] = useState({
    PHONE_NUMBER: "",
    WHATSAPP_MESSAGE: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setWhatsappMessanger({ ...whatsappMessanger, [name]: value });

    setFieldError({
      ...fieldError,
      [name]:
        value === ""
          ? `${
              name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
            } is required`
          : "",
    });
  };

  const validateForm = () => {
    const newError = {};

    let isValid = true;

    Object.entries(whatsappMessanger).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === "") {
        newError[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase()
        } is required`;
      }
      isValid = false;
    });

    setFieldError(newError);

    return isValid;
  };

  const handleSendRequest = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      let number = whatsappMessanger.PHONE_NUMBER;
      let message = whatsappMessanger.WHATSAPP_MESSAGE;

      // const whatsappURL = `https://wa.me/${number}?text=${encodeURI(message)}`;
      const whatsappURL = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
      const existingWhatsAppWindow = window.open(whatsappURL, "_blank");

      if (existingWhatsAppWindow) {
        // If an existing window was found, focus on it
        existingWhatsAppWindow.focus();
      } else {
        // If no existing window was found, open a new one
        window.open(whatsappURL, "_blank");
      }
      // console.log("opened");
    }
  };

  const handleCopyToClipBoard = () => {
    const inputElement = document.querySelector("#copyLink");

    inputElement.select();

    document.execCommand("copy");

    inputElement.setSelectionRange(0, 0);

    alert("Copied to Clipboard");
  };

  return (
    <div>
      <h1 className="board-header"> Appointments</h1>

      <section className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row justify-between mt-10">
        <form
          action=""
          className="shadow-md rounded md:w-[300px] lg:w-[400px] flex flex-col gap-5 p-5"
          onSubmit={handleSendRequest}
        >
          <h1 className="text-green-500 text-f20">Send Review Request</h1>

          <div className="flex flex-col">
            <input
              name="PHONE_NUMBER"
              type="tel"
              placeholder="Client Whatsapp Number"
              value={whatsappMessanger.PHONE_NUMBER}
              onChange={handleChange}
              className="border outline-none h-[40px] px-3 rounded-md"
            />
            <p className="text-red text-f10 mt-1 h-[10px]">
              {fieldError.PHONE_NUMBER}
            </p>
          </div>

          <div className="flex flex-col">
            <textarea
              name="WHATSAPP_MESSAGE"
              placeholder="Whatsapp Message"
              value={whatsappMessanger.WHATSAPP_MESSAGE}
              onChange={handleChange}
              className="border outline-none min-h-[150px] max-h-[150px] p-3 rounded-md"
            />
            <p className="text-red text-f10 mt-1 h-[10px]">
              {fieldError.WHATSAPP_MESSAGE}
            </p>
          </div>
          <button
            type="submit"
            className="border border-green-500 text-green-500 w-[200px] h-[40px] mx-auto rounded-full flex items-center justify-center gap-3"
          >
            <i className="pi pi-whatsapp text-[16px]" />{" "}
            <span>Send Request</span>
          </button>
        </form>

        <div className=" md:w-[280px] lg:w-[400px]">
          <div className="flex flex-row justify-between items-center border w-[250px] h-[30px]">
            <input
              readOnly
              id="copyLink"
              value="Link to review site"
              className="pl-3 outline-none"
            />
            <i
              className="pi pi-copy bg-[#ddd] h-full w-[30px] grid place-content-center"
              onClick={handleCopyToClipBoard}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
