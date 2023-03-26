import * as finnhub from "finnhub";
import { useEffect, useState } from "react";


const api_key = finnhub.ApiClient.instance.authentications["api_key"];
const key = import.meta.env.VITE_API_KEY;
api_key.apiKey = key;
const finnhubClient = new finnhub.DefaultApi();

const Fetch = () => {
  
  const [quote, setQuote] = useState();
  useEffect(() => {

    // useeffect
    // socket.io
    // patch backend -> fetch, price
    finnhubClient.quote("TSLA", (error, data, response) => {
      console.log(data);
      setQuote(data);
    });
  }, []);
    
    return (
        <>
        <div>
        {quote ? (
          <div>
            <h1>Tesla</h1>
            <p>Last price: {quote.c}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
        </>
    )
}

export default Fetch;