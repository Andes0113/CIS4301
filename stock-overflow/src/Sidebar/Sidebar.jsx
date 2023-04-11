import { useState } from 'react';
import './sidebar.css';

export default function Sidebar({ setCompany }) {
  const [companies, setCompanies] = useState([
    {
      name: 'Apple',
      ticker: 'AAPL',
    },
    {
      name: 'Microsoft',
      ticker: 'MSFT',
    },
  ]);
  const [input, setInput] = useState('');

  const selectCompany = (company) => {
    // Update selected company
    setCompany(company);
  };

  const findStocks = () => {
    // Query for all companies matching input
    console.log(input);
  };

  return (
    <div id="sidebar">
      <input
        type="text"
        id="search-entry"
        placeholder="Input Stock"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      />
      <button id="search-button" onClick={findStocks}>
        Search
      </button>
      {companies.map((company) => (
        <button
          onClick={() => selectCompany(company)}
          className="search-result"
          key={company.ticker}
        >
          {company.name}
        </button>
      ))}
    </div>
  );
}
