import { useState } from 'react';
import Chart from './Chart/Chart';
import Sidebar from './Sidebar/Sidebar';

function App() {
  const [company, setCompany] = useState({
    name: 'Apple',
    ticker: 'AAPL',
  });

  return (
    <div className="App">
      <div id="header">Stock Exchange</div>
      <div className="page-container">
        <Sidebar setCompany={setCompany} />
        <Chart company={company} />
      </div>
    </div>
  );
}

export default App;
