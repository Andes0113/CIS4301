import { useState } from 'react';
import './sidebar.css';
import { useSettingsContext } from '../SettingsContext';

export default function Sidebar({ setSelected }) {
  const { multiSelect } = useSettingsContext();
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
  const [query, setQuery] = useState([...companies]);
  const [input, setInput] = useState('');

  const selectCompany = (company) => {
    // Update selected company
    if (multiSelect) {
      setSelected((prev) => {
        if (prev.filter((c) => c.ticker === company.ticker).length === 0) {
          return [...prev, company];
        } else if (prev.length > 1) {
          return prev.filter((c) => c.ticker !== company.ticker);
        }
        return prev;
      });
    } else {
      setSelected([company]);
    }
  };

  const findStocks = () => {
    // Query for all companies matching input
    setQuery(
      companies.filter((c) => {
        return (
          c.name.toLowerCase().includes(input.toLowerCase()) ||
          c.ticker.toLowerCase().includes(input.toLowerCase())
        );
      })
    );
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
      {query.map((company) => (
        <button
          onClick={() => selectCompany(company)}
          className="search-result"
          key={company.ticker}
        >
          {`${company.name} (${company.ticker})`}
        </button>
      ))}
    </div>
  );
}
