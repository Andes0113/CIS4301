import { useEffect, useState } from 'react';
import './Sidebar.css';
import { useSettingsContext } from '../../../Contexts/SettingsContext';
import useCompanies from '../../../hooks/useCompanies';

export default function Sidebar({ setSelected }) {
  const { multiSelect } = useSettingsContext();
  const [input, setInput] = useState('');
  const { companies, loading } = useCompanies();
  const [query, setQuery] = useState(companies);

  useEffect(() => setQuery(companies), [loading]);

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
      <div id="search-results">
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
    </div>
  );
}
