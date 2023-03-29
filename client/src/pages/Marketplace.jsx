import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const beUrl = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      const fetchStocks = async () => {
        try {
          const res = await axios.get(`${beUrl}/stockuniverse/stock/allstock`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          console.log(res.data);
          setStocks(res.data);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchStocks();
    }
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page</div>;
  }

  const logout = async () => {
    try {
      const res = await axios.post(`${beUrl}/stockuniverse/user/logout`);
      console.log(res.data);
      localStorage.removeItem("stocks");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyStock = async (e, name, amount) => {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `${beUrl}/stockuniverse/stock/buystock`,
        {
          name,
          amount,
        }
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        //     withCredentials: true,
        // }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <h1>Marketplace</h1>
        <div className="box">
          <div className="logout-btn">
            <button className="toggler" onClick={logout}>
              Logout
            </button>
          </div>
          <button onClick={() => navigate("/dashboardinvestor")}>
            Dashboard
          </button>
        </div>
        <ul>
          {stocks.map((stock) => (
            <li key={stock.name}>
              <p>NAME: {stock.name}</p>
              <p>price: {stock.price}</p>
              <p>amount: {stock.amount}</p>
              <br />
              <form onSubmit={() => handleBuyStock(stock.name, stock.amount)}>
                <input type="number" name="amount" placeholder="amount" />
                <button type="submit">Buy</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Marketplace;
