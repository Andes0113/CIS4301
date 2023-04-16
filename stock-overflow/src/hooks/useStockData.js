import { useEffect, useState } from 'react';
import { useSettingsContext } from '../Contexts/SettingsContext';
import axios from 'axios';

const pHolder = [
  {
    day: 0,
    AAPL: 4000,
    MSFT: 2400,
    amt: 2400,
  },
  {
    day: 1,
    AAPL: 3000,
    MSFT: 1398,
    amt: 2210,
  },
  {
    day: 2,
    AAPL: 2000,
    MSFT: 9800,
    amt: 2290,
  },
  {
    day: 3,
    AAPL: 2780,
    MSFT: 3908,
    amt: 2000,
  },
  {
    day: 4,
    AAPL: 1890,
    MSFT: 4800,
    amt: 2181,
  },
  {
    day: 5,
    AAPL: 2390,
    MSFT: 3800,
    amt: 2500,
  },
  {
    day: 6,
    AAPL: 3490,
    MSFT: 4300,
    amt: 2100,
  },
];

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

const useStockData = ({ ticker }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dataType, indvar, multiSelect, multiSelectType, startDate, endDate } =
    useSettingsContext();
  let body = { dataType, indvar };
  // if (tickers) body.tickers = tickers;
  if (multiSelect) body.multiSelectType = multiSelectType;

  useEffect(() => {
    // console.log(tickers);
    let start_date = formatDate(startDate);
    let end_date = formatDate(endDate);
    axios
      .get('http://localhost:8000/stock_data', {
        params: {
          ticker,
          start_date,
          end_date,
          indvar,
        },
      })
      .then((res) => {
        setData(res.data.data);
      });
    // setData(pHolder);
    setLoading(false);
  }, [ticker, dataType, indvar, multiSelectType, startDate, endDate]);

  return { data, loading };
};

export default useStockData;
