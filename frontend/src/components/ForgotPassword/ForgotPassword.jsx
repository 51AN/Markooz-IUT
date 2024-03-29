import React, { Component } from 'react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const ForgotPassword = () =>{
    const [email, setEmail] = useState(""); 

    const handleSubmit = async (e) => {
      e.preventDefault();

      await axios.post(`${server}/user/forgotpassword`, {email}).then(
        (response)=>{
          toast(response.data.message)
        }
      ).catch((error)=>{toast(error)})
    };
    return(
        <div>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-md">
<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
  Enter Your Email
</h2>
</div>
<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email address
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
    </div>
    

    <div>
      <button
        type="submit"
        className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
      >
        Submit
      </button>
    </div>
    <div className={`${styles.noramlFlex} w-full`}>
      <h4>Do not have an account?</h4>
      <Link to="/sign-up" className="text-orange-600 pl-2">
        Sign Up
      </Link>
    </div>
  </form>
</div>
</div>
</div>
    </div>
    );
};

export default ForgotPassword;