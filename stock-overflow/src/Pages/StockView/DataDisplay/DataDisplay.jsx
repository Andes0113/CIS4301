import Chart from './Chart/Chart';
import useStockData from '../../../hooks/useStockData';
import './DataDisplay.css';

function DataDisplay({ selected }) {
  let req = { ticker: selected[0].ticker };
  if (selected.length > 1) {
    req['ticker2'] = selected[1].ticker;
  }
  let { data, loading } = useStockData(req);

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
