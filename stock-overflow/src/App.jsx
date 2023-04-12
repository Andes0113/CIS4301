import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Discussion from './Discussion/Discussion';
import DataDisplay from './DataDisplay/DataDisplay';
import ControlPanel from './ControlPanel/ControlPanel';
import { SettingsContextProvider } from './SettingsContext';

function App() {
  const [selected, setSelected] = useState([
    {
      name: 'Apple',
      ticker: 'AAPL',
    },
  ]);

  return (
    <div className="App">
      <div id="header">Stock Overflow</div>
      <div className="page-container">
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

export default App;
