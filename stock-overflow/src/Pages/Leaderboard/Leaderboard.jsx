import { useState } from 'react';
import useLeaderboard from '../../hooks/useLeaderboard';
import Header from '../header';
import { Link } from 'react-router-dom';
import './Leaderboard.css';

function Leaderboard() {
  const [startDate, setStartDate] = useState('2022-01-01');
  const [endDate, setEndDate] = useState('2023-01-01');
  const { data, loading } = useLeaderboard({ startDate, endDate });

  return (
    <>
      <Header />
      <div id="leaderboard-controls">
        <div className="control-option">
          <label htmlFor="start-date-input">Start Date</label>
          <input
            id="start-date-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="control-option">
          <label htmlFor="end-date-input">End Date</label>
          <input
            id="end-date-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      {data.map((trade, idx) => (
        <div className="leaderboard-content-div" key={idx}>
          <div className="leaderboard-trade-display">
            <Link to={`/user/${trade.username}/posts`}>
              User: {trade.username}
            </Link>
            <div>Ticker: {trade.ticker}</div>
            <div>Purchase Date: {trade.purchase_date}</div>
            <div>Sell Date: {trade.sell_date}</div>
            <div>Percent Profit: {trade.percent_profit}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Leaderboard;
