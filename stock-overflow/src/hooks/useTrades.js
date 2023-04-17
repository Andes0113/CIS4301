import { useEffect, useState } from 'react';
import axios from 'axios';

const pHolder = [
  {
    id: 1,
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    id: 2,
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    id: 3,
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
  {
    id: 4,
    user: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet consectetur adipiscing elit duis tristique. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing.',
    ticker: 'AAPL',
  },
];

const useTrades = ({ username, ticker }) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/trades?username=${username}&ticker=${ticker}`)
      .then((res) => {
        setTrades(res.data.data);
        setLoading(false);
      });
  }, [username, ticker]);

  return { trades, loading };
};

export default useTrades;
