import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardCompany = () => {

    const beUrl = import.meta.env.VITE_BE_URL;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        ticker: "",
        price: "",
        amount: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem('token');
            // if (!token) {
            //   console.log( 'No token found')
            //   return;
            // }
            const res = await axios.post(
              `${beUrl}/stockuniverse/stock/addstock`,
              formData,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${token}`,
            //     },
            //     withCredentials: true,
            //   }
            );
            console.log(res.data);
            setFormData({
              name: '',
              ticker: '',
              price: '',
              amount: '',
            });
          } catch (err) {
            console.error(err);
        
          }
        };


    const logout = async () => {
        try {
            const res = await axios.post(`${beUrl}/stockuniverse/user/logout`);
            console.log(res.data)
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div>
        <h1>Dashboard Company</h1>
        </div>
        <div className='box'>

        <div className='logout-btn'>

        <button className='toggler' onClick={logout}>Logout</button>
        </div>
        </div>
        <br />
        <div>
      <h1>Add a Stock</h1>
     
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ticker:
          <input
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add Stock</button>
      </form>
    </div>
      
        </>
    );
}

export default DashboardCompany;
