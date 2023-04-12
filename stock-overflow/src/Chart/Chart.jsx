import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

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

function Chart({ company }) {
  const [data, setData] = useState(pHolder);

  useEffect(() => {
    setData(
      pHolder.map((instance) => ({
        day: instance.day,
        [company.ticker]: instance[company.ticker],
      }))
    );
  }, [company]);

  return (
    <>
      <div id="chart-company-header">{`${company.name} (${company.ticker})`}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={company.ticker}
            stroke="#960000"
            activeDot={{ r: 6 }}
          />
          {/* <Line type="monotone" dataKey="price" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
