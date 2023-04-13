import { useEffect, useState } from 'react';
import { useSettingsContext } from '../SettingsContext';

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

const useStockData = ({ tickers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dataType, indvar, multiSelect, multiSelectType } =
    useSettingsContext();
  let body = { dataType, indvar };
  if (tickers) body.tickers = tickers;
  if (multiSelect) body.multiSelectType = multiSelectType;
  console.log(body);

  useEffect(() => {
    setData(pHolder);
    setLoading(false);
  }, [tickers]);

  return { data, loading };
};

export default useStockData;
