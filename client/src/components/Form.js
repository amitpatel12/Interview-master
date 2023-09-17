import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const Form = ({ formData, setFormData, handleApi, text }) => {
  const [errors, setErrors] = useState({
    emailError: "",
    mobileError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailParts = email.split("@");
    if (
      emailParts.length !== 2 ||
      emailParts[0].length === 0 ||
      emailParts[1].length === 0
    ) {
      return false;
    }
    return true;
  };

  const validateMobile = (mobileNo) => {
    if (
      mobileNo.length !== 10 ||
      !["6", "7", "8", "9"].includes(mobileNo.charAt(0))
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, mobileNo } = formData;
    const emailIsValid = validateEmail(email);
    const mobileIsValid = validateMobile(mobileNo);

    if (!emailIsValid) {
      setErrors({ ...errors, emailError: "Invalid email address" });
    } else {
      setErrors({ ...errors, emailError: "" });
    }

    if (!mobileIsValid) {
      setErrors({ ...errors, mobileError: "Invalid mobile number" });
    } else {
      setErrors({ ...errors, mobileError: "" });
    }

    if (emailIsValid && mobileIsValid) {

      const date = format(new Date(), "dd-MM-yyyy");
      setFormData({ ...formData, ["date"]: date.toString() });

      // Process the form data or submit it to the server
      console.log("Form submitted successfully!", formData);
      if(date)
      handleApi()
    }
  };

  useEffect(()=> {
    const date = format(new Date(), "dd-MM-yyyy");
      setFormData({ ...formData, ["date"]: date.toString() });
  },[])

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
      <div className="flex gap-3">
        <label htmlFor="name" className="w-[30%]">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="outline-none border-[1px] border-[#574E7B] rounded-[4px] px-1"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex gap-3">
        <label htmlFor="spoc" className="w-[30%]">
          SPOC
        </label>
        <input
          type="text"
          id="spoc"
          name="spoc"
          className="outline-none border-[1px] border-[#574E7B] rounded-[4px] px-1"
          value={formData.spoc}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-3">
        <label htmlFor="mobileNo" className="w-[30%]">
          Mobile Number
        </label>
        <div className="flex flex-col">
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            className="outline-none border-[1px] border-[#574E7B] rounded-[4px] px-1"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
          <span className="text-red-700">{errors.mobileError}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <label htmlFor="email" className="w-[30%]">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="outline-none border-[1px] border-[#574E7B] rounded-[4px] px-1"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <span className="text-red-700">{errors.emailError}</span>
      </div>
      <div className="flex justify-center text-white">
        <button
          type="submit"
          className="bg-[blue] w-fit p-2 px-5 rounded-[4px]"
        >
          {text}
        </button>
      </div>
    </form>
  );
};

export default Form;
