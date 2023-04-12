import { useState } from 'react';
import Chart from './Chart/Chart';
import Sidebar from './Sidebar/Sidebar';
import Discussion from './Discussion/Discussion';

function App() {
  const [company, setCompany] = useState({
    name: 'Apple',
    ticker: 'AAPL',
  });

  return (
    <div className="App">
      <div id="header">Stock Overflow</div>
      <div className="page-container">
        <Sidebar setCompany={setCompany} />
        <div className="maincontent-container">
          <Chart company={company} />
          <Discussion company={company} />
        </div>
      </div>
    </div>
  );
}

export default App;
