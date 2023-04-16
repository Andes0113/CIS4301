import Chart from './Chart/Chart';
import useStockData from '../../../hooks/useStockData';
import './DataDisplay.css';

function DataDisplay({ selected }) {
  let { data, loading } = useStockData({
    ticker: selected[0].ticker,
  });

  const headerString = selected
    .map((c) => `${c.name} (${c.ticker})`)
    .join(', ');

  return (
    <>
      <div id="chart-company-header">{headerString}</div>
      {!loading && <Chart data={data} selected={selected} />}
    </>
  );
}

export default DataDisplay;
