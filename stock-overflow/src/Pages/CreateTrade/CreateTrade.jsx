import {
  AuthContextProvider,
  useAuthContext,
} from '../../Contexts/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import './CreateTrade.css';
import Header from '../header';
import { Navigate } from 'react-router-dom';

const formatDate = (unformatted_date) => {
  let date = new Date(unformatted_date);
  date = date.toLocaleString('default', {
    timeZone: 'UTC',
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
  date = date.split(' ');
  date[1] = date[1].substr(0, date[1].length - 1);
  let temp = date[1];
  date[1] = date[0];
  date[0] = temp;
  date[1] = date[1].toUpperCase();
  date = date.join('-');
  return date;
};

function CreateTrade() {
  const { user } = useAuthContext();
  const [ticker, setTicker] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2022-01-03');
  const [sellDate, setSellDate] = useState('2023-01-09');

  const createTrade = () => {
    const purchase_date = formatDate(purchaseDate);
    const sell_date = formatDate(sellDate);
    axios
      .post('http://localhost:8000/trades', {
        username: user,
        ticker,
        purchase_date,
        sell_date,
      })
      .then((res) => {
        setTicker('');
        setPurchaseDate('2022-01-03');
        setSellDate('2023-01-02');
      });
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <>
      <Header />
      <div id="trade-input">
        <div className="control-option">
          <label htmlFor="create-trade-ticker-input">Input Ticker</label>
          <input
            type="text"
            id="create-trade-ticker-input"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </div>
        <div className="control-option">
          <label htmlFor="start-date-input">Purchase Date</label>
          <input
            id="start-date-input"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <div className="control-option">
          <label htmlFor="end-date-input">Sell Date</label>
          <input
            id="end-date-input"
            type="date"
            value={sellDate}
            onChange={(e) => setSellDate(e.target.value)}
          />
        </div>
        <button onClick={createTrade}>Create</button>
      </div>
    </>
  );
}

export default CreateTrade;
