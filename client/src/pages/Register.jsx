import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {

    const beUrl = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const res = await axios.post(`${beUrl}/stockuniverse/user/register`, userData)
    console.log(res.data)
    navigate("/")
}catch(error){
    console.log(error)
}
    };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
        <br />
        <label htmlFor="role">Role:</label>
        <br />
        <select id="role" name="role" value={userData.role} onChange={handleChange}>
          <option value="">Select a role</option>
          <option value="investor">Investor</option>
          <option value="company">Company</option>
        </select>
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};


export default Register