import { useEffect, useState } from 'react';
import { useSettingsContext } from '../Contexts/SettingsContext';
import axios from 'axios';

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

const useStockData = ({ ticker, ticker2 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dataType, indvar, multiSelect, multiSelectType, startDate, endDate } =
    useSettingsContext();
  // if (tickers) body.tickers = tickers;
  // if (multiSelect) body.multiSelectType = multiSelectType;
  console.log(ticker2);

  useEffect(() => {
    // console.log(tickers);
    let start_date = formatDate(startDate);
    let end_date = formatDate(endDate);
    let params = {
      ticker,
      start_date,
      end_date,
      indvar,
      dataType,
      multiSelect,
    };
    if (multiSelect && ticker2) {
      params['multiSelectType'] = multiSelectType;
      params['ticker2'] = ticker2;
    } else {
      params['ticker2'] = null;
      params['multiSelectType'] = 'None';
      params['ticker2'] = '';
    }
    axios
      .get('http://localhost:8000/stock_data', {
        params,
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      });
    // setData(pHolder);
    setLoading(false);
  }, [ticker, ticker2, dataType, indvar, multiSelectType, startDate, endDate]);

  return { data, loading };
};

export default useStockData;
