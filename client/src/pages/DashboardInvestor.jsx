import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as finnhub from "finnhub";

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
const key = import.meta.env.VITE_API_KEY;
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

const DashboardInvestor = () => {
  const beUrl = import.meta.env.VITE_BE_URL;
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [quote, setQuote] = useState();

  useEffect(() => {
    const stocks = localStorage.getItem("stocks");
    const allstocks = JSON.parse(stocks);

    const quote = allstocks.map(() => null);

    setStocks(allstocks);
    setQuote(quote);
  }, []);
  const fetch = (ticker) => {
    finnhubClient.quote(ticker, (error, data, response) => {
      console.log(data);
      setQuote(data);
    });
  };

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

  const sell = async (name, amount) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${beUrl}/stockuniverse/stock/sellstock`, {
        name,
        amount,
      });
      console.log(res.data);
      const updatedStocks = stocks.map((stock) => {
        if (stock.name === name) {
          return { ...stock, amount: stock.amount - amount };
        } else {
          return stock;
        }
      });
      setStocks(updatedStocks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1>Dashboard Investor</h1>
        <div className="box">
          <div className="logout-btn">
            <button className="toggler" onClick={logout}>
              Logout
            </button>
          </div>
          <button onClick={() => navigate("/marketplace")}>Marketplace</button>
        </div>
        {stocks.length > 0 ? (
          <ul>
            {stocks.map((stock) => (
              <li key={stock.name}>
                <p>{stock.name}</p>
                <p>{stock.ticker}</p>
                <p>price: {quote?.c}$</p>
                <p>amount: {stock.amount}</p>
                <p>total value: {quote?.c * stock.amount}$</p>
                <button onClick={() => fetch(stock.ticker)}>fetch</button>
                <button onClick={() => sell(stock.name, stock.amount)}>
                  Sell
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No stocks found</p>
        )}
      </div>
    </>
  );
};

export default DashboardInvestor;
