import { useParams } from 'react-router-dom';
import Chart from '../StockView/DataDisplay/Chart/Chart';
import useFundData from '../../hooks/useFundData';
import { useSettingsContext } from '../../Contexts/SettingsContext';
import { useEffect } from 'react';
import './FundPage.css';
import Header from '../header';

function FundPage() {
  let { fund_id } = useParams();
  const { data, fundStocks, loading } = useFundData({ fund_id });
  const { startDate, setStartDate, endDate, setEndDate, setMultiSelectType } =
    useSettingsContext();
  useEffect(() => {
    setMultiSelectType('standard');
  }, []);

  return (
    <>
      <Header />
      <div id="fund-chart">
        {!loading && data.length > 0 && (
          <Chart data={data} selected={[{ ticker: Object.keys(data[0])[0] }]} />
        )}
        <div id="fund-control-panel">
          <div className="control-option">
            <label htmlFor="start-date-input">Start Date</label>
            <input
              id="start-date-input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="control-option">
            <label htmlFor="end-date-input">End Date</label>
            <input
              id="end-date-input"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div id="fund-stocks">
        Stocks
        {fundStocks.map((stock) => (
          <div key={stock.ticker} className="fund-stock">
            <div> {stock.ticker}</div>
            <div> {stock.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FundPage;
