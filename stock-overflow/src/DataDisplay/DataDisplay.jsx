import { useState, useEffect } from 'react';
import Chart from './Chart/Chart';

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

function DataDisplay({ selected }) {
  const [data, setData] = useState(pHolder);
  useEffect(() => {
    setData(pHolder);
  }, [selected]);

  const headerString = selected
    .map((c) => `${c.name} (${c.ticker})`)
    .join(', ');

  return (
    <>
      <div id="chart-company-header">{headerString}</div>
      <Chart data={data} selected={selected} />
    </>
  );
}

export default DataDisplay;
