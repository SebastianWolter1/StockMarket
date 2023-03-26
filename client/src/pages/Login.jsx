import React, { useState } from "react";
import axios from "axios";
import backgroundpic from "../assets/backgroundpic3.jpg";
import { StockContext } from "../global/Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const beUrl = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${beUrl}/stockuniverse/user/login`, {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.role === "investor") {
        console.log("investor", res.data);
        const stocks = JSON.stringify(res.data.stocks);
        localStorage.setItem("stocks", stocks);
        localStorage.setItem("token", res.data.token);
        console.log(stocks)
        navigate("/dashboardinvestor");
      }
      if (res.data.role === "company") {
        console.log("company", res.data);
        const token = JSON.stringify(res.data.token);

        localStorage.setItem("token", token);

        navigate("/dashboardcompany");
      }
    } catch (error) {
      console.log(error);
    }

    
  };

  return (
    <>
      <div className="register-btn">
        <button onClick={()=>navigate("/register")} className="toggler">Register</button>
      </div>
      <h1>Full Stock Universe</h1>
      <h3>The Fullstack Stock Market</h3>
      <img src={backgroundpic} />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
      </form>
    </>
  );
};

export default Login;
