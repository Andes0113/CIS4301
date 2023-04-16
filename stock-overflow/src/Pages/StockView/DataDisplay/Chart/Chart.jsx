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

const colors = ['#3498DB', '#B03A2E', '#28B463', '#28B463', '#F1C40F'];

function Chart({ data, selected }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Legend />
        {selected.map((c, idx) => {
          return (
            <Line
              key={idx}
              type="monotone"
              dataKey={c.ticker}
              stroke={colors[idx]}
              dot={false}
            />
          );
        })}
        {/* <Line type="monotone" dataKey="price" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
