import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Discussion from './Discussion/Discussion';
import DataDisplay from './DataDisplay/DataDisplay';
import ControlPanel from './ControlPanel/ControlPanel';
import { SettingsContextProvider } from '../../Contexts/SettingsContext';
import Header from '../header';

function StockView() {
  const [selected, setSelected] = useState([
    {
      name: 'Apple',
      ticker: 'AAPL',
    },
  ]);

  return (
    <div className="App">
      <Header />
      <div className="stockview-container">
        <SettingsContextProvider>
          <Sidebar setSelected={setSelected} />
          <div className="maincontent-container">
            <DataDisplay selected={selected} />
            <ControlPanel />
            <Discussion selected={selected} />
          </div>
        </SettingsContextProvider>
      </div>
    </div>
  );
}

export default StockView;
