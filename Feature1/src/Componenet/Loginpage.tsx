import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Loginpage() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: any) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    console.log("Signup response:", data);

    if (response.ok) {
      alert("login successful");
    navigate("/home");
    } else {
      alert(data.message || "login failed");
    }

  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">
         Login 
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
          Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
         Do not have account?{' '}
          <Link to="/sign" className="text-blue-500 hover:underline">
           Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;