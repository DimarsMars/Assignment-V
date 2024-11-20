import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState (null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = process.env.REACT_APP_API_URL

    axios.get(url, {
      params: {
        apikey: apiKey,
        symbols : "CAD,EUR,IDR,JPY,CHF,CBP"
      },
    })
      .then((res) => {
        console.log(res.data.rates);
        setData(res.data.rates);
      })
      .catch(err => {
        console.log('error fetching API:', err);
      })

  }, []);


  return (
    <div className='background'>
      <div className='container'>
        <table className='table table-striped transparant'>
          <thead>
            <tr className='text-center'>
              <th scope="col">Curency</th>
              <th scope="col">We Buy</th>
              <th scope="col">Exchange Rate</th>
              <th scope="col">We Sell</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            { data ? (
              Object.entries(data).map(([curency, rate]) => (
              <tr key={curency}>
                <th scope="row">{curency}</th>
                <td>{(rate * 1.05).toFixed(4)}</td>
                <td>{rate}</td>
                <td>{(rate * 0.95).toFixed(4)}</td>
              </tr>
              ))
              ) : (
                <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='text'>
          <p>Rates Are Based From 1 USD</p>
          <p>This Application uses API from <a href='https://currencyfreaks.com/'>https://api.currencyfreaks.com</a></p>
        </div>
      </div>
    </div>
  )
}

export default App