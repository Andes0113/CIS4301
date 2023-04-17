import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTrades from '../../../hooks/useTrades';
import { Link } from 'react-router-dom';

function Trades() {
  let { username } = useParams();
  const { trades, loading } = useTrades({ username, ticker: 'null' });
  return (
    <div className="user-content-div">
      <div id="create-fund-nav">
        <Link to="/create/trade">Create Trade</Link>
      </div>

      {trades.map((trade, idx) => (
        <div className="user-content-div" key={idx}>
          <div className="trade-display">
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
    </div>
  );
}

export default Trades;
